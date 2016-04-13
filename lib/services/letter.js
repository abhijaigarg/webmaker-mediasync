/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

var KEYS = require( "../keys" ),
    request = require( "request" );


module.exports = function( options, callback ) {
  var query = options.query.q,
      letterKey = KEYS.get( "letter" ),
      searchURI = "http://10.230.9.135:5000/search?q={QUERY}",
      uri = searchURI,
      limit = options.limit,
      page = ( options.page - 1 ) * limit,
      cachedURI;

  uri = uri.replace( "{QUERY}", query );
  // cachedURI = uri;
  // uri = uri.replace( "{LIMIT}", limit );
  // uri = uri.replace( "{OFFSET}", page );


  request({
    method: "GET",
    json: true,
    uri: uri
  }, function( err, response, body ) {

    if ( err ) {
      return callback( err );
    }

    if ( !body ) {
        return callback( null, {
          results: [],
          total: 0,
          service: "Letter"
        });
    }

    // var oldObj,
    //     dataArray = [],
    //     tempObj;

    // // Custom parsing of data so results mimic how we build clips in Popcorn Maker
    // dataArray = body.map(function( audio ) {
    //   tempObj = {};

    //   tempObj.source = "https://upload.wikimedia.org/wikipedia/commons/e/ea/University_of_Bradford_school_of_management.jpg";//audio.permalink_url;
    //   tempObj.author = "Abhijai"//audio.user.username;
    //   tempObj.thumbnail = "https://upload.wikimedia.org/wikipedia/commons/e/ea/University_of_Bradford_school_of_management.jpg";//audio.artwork_url;
    //   tempObj.duration = 40;//audio.duration / 1000;
    //   tempObj.title = "Abhi test";//audio.title;
    //   tempObj.hidden = true;
    //   tempObj.type = "Letter";

    //   return tempObj;
    // });

    // // Results are returned in opposite order as they appear when searching
    // // SoundCloud directly.
    // dataArray.reverse();

    // request({
    //   method: "GET",
    //   json: true,
    //   uri: cachedURI
    // }, function( err, response, body ) {

    //   if ( err ) {
    //     return callback( err );
    //   }

    //   // If this request failed rather than bailing use the current data array for reported
    //   // length
    //   if ( !Array.isArray( body ) ) {
    //     body = dataArray;
    //   }

      
      // TODO: File some sort of followup to investigate a non terrible solution to fix this.
    callback( null, {
      results: body.results,
      total: body.results.length,
      service: "Letter"
    });


  });
};
