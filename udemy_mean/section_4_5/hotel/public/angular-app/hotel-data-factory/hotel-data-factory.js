angular.module('meanhotel').factory('hotelDataFactory', hotelDataFactory);

function hotelDataFactory($http) {
  return {
    hotelList: hotelList,
    hotelDisplay: hotelDisplay,
    postReview: postReview
  };

  function hotelList() {
      // handle the promise here, using then
    return $http.get('/api/hotels?count=10').then(complete).catch(failed);
  }

  function hotelDisplay(id) {
    return $http.get('/api/hotels/' + id).then(complete).catch(failed);
  }

  function postReview(id, review, token) {
    // have to pass in token through the auth header.
    return $http({
      method: 'POST',
      url:'/api/hotels/' + id + '/reviews',
      headers:{
        'authorization': 'Token ' + token
      },
      data: review
    }).then(complete).catch(failed);

  }

  function complete(response) {
    return response;
  }

  function failed(error) {
    console.log(error.statusText);
  }

}