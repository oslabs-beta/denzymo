class TemplateDashport {
  private _sId: (string | number) = '';

  /**
   * Usually a middleware function.
   * 
   * Creates a _dashport object that will persist across multiple HTTP requests.
   * 
   * Parameters will be specific to the server framework (e.g. Oak will be ctx
   * and next)
   * Output will usually be invocation of a 'next' function
   */
  public initialize() {
    // check if _dashport exists. If it doesn't, create one
    // invoke 'next'
  }

  /**
   * In OAuth, there is a lot of back and forth communication between the
   * client, the app, and the OAuth provider, when a user want to sign in.
   * Tokens are sent back and forth and user data gets sent back at the end. 
   * The middleware function that is returned from the 'authenticate' method 
   * bundles up this functionality by executing code depending if a user has
   * been authenticated or not. This allows one method to be used for a seamless
   * OAuth process.
   * 
   * Authenticate method takes in a 'strategy', 'serializer', and 'deserializer'.
   * 
   * Strategies are classes that handle the OAuth process for a specific OAuth
   * provider. A 'strategy' will be an instantiation of a new Strategy class
   * such as GoogleStrategy. When strategies are instantiated, options must be
   * passed in such as a client ID, client secret, redirect URI, etc., for the
   * strategy class to use. ALL strategies made for Dashport MUST have a 'router'
   * method that on successful authentication, returns an authData object with a
   * userInfo property in the form of UserProfile.
   * 
   * Serializers are functions that need to have the following functionalities:
   *   1. The serializer function needs to take in one argument which will be
   *      the user data in the form of an object. This will be in the shape of
   *      the UserProfile interface
   *   2. The serializer function needs to specify what the developer wants to
   *      do with the user data (e.g. store in a database)
   *   3. The serializer function should to specify how to create a serialized ID
   *   4. The serializer function should return the serialized ID or an error
   * 
   * Deserializers are functions that need to have the following functionalities:
   *   1. The deserializer function needs to take in one parameter which will be
   *      the serialized ID
   *   2. The deserializer function needs to specify what the developer wants to
   *      do with the serialized ID to obtain user info (e.g. fetch user's data
   *      from a database)
   *   3. The deserializer function needs to return the user info or an Error
   * 
   * EXAMPLE: Using dashport.authenticate as a middleware in Oak
   *   import * as dpSettings from './dashport.settings.ts';
   * 
   *   router.get('/test',
   *     dashport.authenticate(
   *       dpSettings.googleStrat,
   *       dpSettings.serializerA,
   *       dpSettings.deserializerA
   *     ),
   *     (ctx, next) => {
   *       ctx.response.body = 'Hello World';
   *     }
   *   );
   * 
   * @param strategy - An instance of a strategy to be used
   * @param {Function} serializer - The function that will take in user info and
   * output an ID
   * @param {Function} deserializer - The function that will take in an ID and
   * output user info
   * @returns Output should be the function that will be the middleware
   */
  public authenticate(strategy, serializer: Function, deserializer: Function) {
    // below error checks will only run once when code is first compiled

    // arguments error check
    if (strategy === undefined || serializer === undefined || deserializer === undefined) {
      throw new Error("ERROR in authenticate: authenticate must be passed 'strategy', 'serializer', and 'deserializer' values.");
    }

    // strategy error checks
    if (typeof(strategy) !== 'object') {
      throw new Error('ERROR in authenticate: strategy must be an object (should be a class).');
    }
    if (strategy.router === undefined) {
      throw new Error('ERROR in authenticate: strategy must have a \'router\' property.');
    }
    if (typeof(strategy.router) !== 'function') {
      throw new Error('ERROR in authenticate: strategy\'s \'router\' property must be a function (should be method on strategy class).');
    }

    // serializer error checks
    if (typeof serializer !== 'function') {
      throw new Error('ERROR in authenticate: serializer must be a function.');
    }
    if (serializer.length !== 1) {
      throw new Error('ERROR in authenticate: serializer function must take in exactly 1 parameter (which will be an object containing the user info).');
    }

    // deserializer error checks
    if (typeof deserializer !== 'function') {
      throw new Error('ERROR in authenticate: deserializer must be a function.');
    }
    if (deserializer.length !== 1) {
      throw new Error('ERROR in authenticate: deserializer function must take in exactly 1 parameter (which will be the ID generated from the serializer).');
    }

    // return an async middleware function that fits the server framework being used
      // check if _dashport object exists. If it doesn't, throw an error

      // check if session property exists on _dashport. If it does, check if its
      // value equals this._sId and that this._sId is not ''. If true user has
      // already been authenticated, so invoke deserializer and store info on
      // ctx.local for next middleware, and call 'next'

      // if above check is not passed, user must be authenticated (again), so
      // call the requested strategy's 'router' method. authData must contain
      // a userInfo property in the form of UserProfile
      // ex for Oak:
      // const authData: (AuthData | undefined) = await strategy.router(ctx, next);

      // check if authData is not undefined (it will be undefined in the first
      // step of the OAuth process when user gets redirected to OAuth provider
      // to log in). If it is not undefined, that means user has been
      // authenticated by OAuth. Can begin session management process
        // obtain a serialized ID by using the serializer function. It should be
        // a string or a number

        // store the serialized ID onto a session object on _dashport and onto
        // this instance of Dashport's _sId

        // invoke the deserializer, passing in the serialized ID, to get the
        // data in the structure the developer wants. Store the info on
        // ctx.locals for the next middleware to access

        // invoke 'next'
  }

  /**
   * Adds the serializedId obtained in authenticate method to the _dashport
   * object and to the _sId property of this instance of Dashport. This will
   * help with session management.
   * 
   * One parameter will be the object containing the _dashport object
   * @param {(string|number)} serializedId - the serialized ID generated in
   * authenticate by the serializer function
   */
  private logIn(serializedId: (string | number)): void {
    // check if the _dashport object exists
      // if it does, add serializedId as a value onto _dashport and as the value
      // for this._sId
      // if it doesn't, throw an error since _dashport needs to exist
  }

  /**
   * Deletes any session info that exists on the _dashport object. This will
   * cause the user to go through the OAuth process on the next authenticate call.
   * 
   * Parameters will be specific to the server framework (e.g. Oak will be ctx
   * and next)
   */
  public logOut() {
    // delete the session information from _dashport
    // invoke 'next'
  }
}

export default TemplateDashport;
