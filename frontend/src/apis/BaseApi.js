import request from 'superagent';

import AccessToken from '../constants/AccessToken';

const isValidMethod = method => {
    switch (method) {
        case 'GET':
            return true;
        case 'POST':
            return true;
        case 'DELETE':
            return true;
        default:
            return false;
    }
};

const isObject = value => {
    const type = typeof value;
    return !!value && (type === 'object' || type === 'function');
};

const apiActionHasRequiredFields = action => {
    return action &&
        action.hasOwnProperty('name') &&
        action.hasOwnProperty('method') &&
        action.hasOwnProperty('path');
};

const apiActionHasFieldsOfValidType = action => {
    return typeof action.name === 'string' &&
        typeof action.path === 'string' &&
        isValidMethod(action.method);
};

// Helper function to determine if provided object has all the fields neccessary to be a valid Api action.
const isValidApiAction = action => {
    // Check if all fields are present.
    if (!apiActionHasRequiredFields(action)) {
        this._log('API action definition does not have all the required fields.', action);
        return false;
    }
    // Check if all fields are of correct type.
    if (!apiActionHasFieldsOfValidType(action)) {
        this._log('API action definition does not have all the required fields in correct type/format.', action);
        return false;
    }
    // all checks passed, api action definition is valid
    return true;
};

const appendQuery= (req, name, value) => {
    // check if property value is an array or a value
    if (Array.isArray(value)) {
        // each value becomes query property
        for (let i = 0; i < value.length; i++) {
            let obj = {};
            obj[`${name}[]`] = value[i];
            req.query(obj);
        }
    } else {
        // check if req url contains property and interpolate
        if (req.url.indexOf('{' + name + '}') > -1) {
            req.url = req.url.replace('{' + name + '}', value);
        } else {
            // otherwise, append value as query parameter
            let obj = {};
            obj[name] = value;
            req.query(obj);
        }
    }
    return req;
};

const setupContext = (targetRequest, context) => {
    let req = targetRequest;
    // build path and query params
    if (context && context.hasOwnProperty('query') && isObject(context.query)) {
        // iterate over properties of the context object
        for (let property in context.query) {
            if (context.query.hasOwnProperty(property)) {
                req = appendQuery(req, property, context.query[property]);
            }
        }
    }

    // build payload, if any
    if (context && context.hasOwnProperty('payload')) {
        req.send(context.payload);
    }

    // build files, if any
    if (context && context.hasOwnProperty('files') && Array.isArray(context.files)) {
        for (let i = 0; i < context.files.length; i++) {
            req.attach(context.files[i].name, context.files[i].file);
        }
    }

    // add authentication header
    const token = localStorage.getItem(AccessToken);
    if (token) {
        req.set('Authorization', `Bearer ${token}`);
    }

    return req;
};


// Api instance class, represents web Api.
class BaseApi {
    // supported http verbs
    static get Get() {
        return 'GET';
    }

    static get Post() {
        return 'POST';
    }

    static get Delete() {
        return 'DELETE';
    }

    // Constructor for web Api instance, requires endpoint to be specified.
    constructor(endpoint, debug = false) {
        if (endpoint !== undefined) {
            // endpoint passed and not undefined
            this._endpoint = endpoint;
        } else {
            // endpoint not passed or undefined
            this._log('No endpoint specified for API instance.');
            throw new Error('Cannot create GLU.Api instance without specifying the endpoint.');
        }
        // set up debug context
        this.debug = debug;
    }

    // Logger in debug context
    _log() {
        if (this.debug) {
            console.log.apply(console, ['[ Api Helper ] [' + this.constructor.name + ']'].concat(arguments));
        }
    }

    // Helper function to generate Api action based on the action specification object.
    generateApiAction(action) {
        // now we have request object with (possibly templated) url
        let r = function (context) {
            // wrap superagent request into a promise. Bind it to api instance so it gets updated when neccessary.
            return new Promise(function (resolve, reject) {

                // request instance
                let rq = null;

                // full Url
                let url = this._endpoint + action.path;

                // set action type
                switch (action.method) {
                    case 'GET':
                        rq = request.get(url);
                        break;
                    case 'POST':
                        rq = request.post(url);
                        break;
                    case 'DELETE':
                        rq = request.del(url);
                        break;
                    default:
                        rq = request.get(url);
                }

                // we have request model, now we have to inject context from request
                rq = setupContext(rq, context);

                // finally, we start executing the request
                rq.end((err, res) => {
                    // reject or resolve
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
            }.bind(this));
        };
        return r;
    }

    // Creates api functions and binds them to this object. This is a variadic function.
    // Url params are given like this: /object/{objectID}
    // Resulting API actions are API object methods that receive request context object and return a promise.
    // All request context object's fields are optional.
    // Input = {
    //    query: {x: 'x', y: 'y'},
    //     payload: {a:'a',b:'b'},
    //    files: [{name: '', path: '', filename: ''}]
    // }
    createApiActions() {
        // Get variadic arguments
        let apiActions = Array.prototype.slice.call(arguments);

        // For each api action specified, create and register function
        apiActions.forEach(apiAction => {
            // If action is not given as object
            if (!isObject(apiAction)) {
                this._log('Passed non-object value as API action definition: ', apiAction);
                throw new Error('Cannot create api action from non-object value: ' + JSON.stringify(apiAction));
            }

            // If action is not given in required format
            if (!isValidApiAction(apiAction)) {
                this._log('Invalid API action definition: ', apiAction);
                throw new Error('Cannot create api action from invalid object: ' + JSON.stringify(apiAction));
            }

            // action is okay, prepare the function and append it to this object
            this[apiAction.name] = this.generateApiAction(apiAction);
            this._log('Created API action from definition.', this._endpoint, apiAction);
        });
    }
}

export default BaseApi;