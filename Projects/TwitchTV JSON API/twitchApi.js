// const endPoint = 'https://api.twitch.tv/helix/users?login=ESL_SC2&login=OgamingSC2&login=tommy181933';
const endPoint1 = 'https://api.twitch.tv/kraken/users?login=';
const endPoint2 = 'https://api.twitch.tv/kraken/streams/?channel=';
// const endPoint = 'https://api.twitch.tv/kraken/streams/followed';

const streamer = ['ESL_SC2', 'OgamingSC2', 'nl_kripp', 'uzra', 'tomchen60229', 'freecodecamp', 'tukuyomi', 'storbeck', 'habathcx', 'roger9527', 'blusewilly_retry', 'tommy181933'];

const streamerID = [];
const streamerInfo = [];

fetch(endPoint1 + streamer.join(','), {
  method: 'GET',
  headers: {
    'Client-ID': '6vraacbw7vxpj9x3tjg969gnl4rovf',
    Accept: 'application/vnd.twitchtv.v5+json',
  },

})
  .then(blob => blob.json())
  .then((data) => {
    for (let i = 0; i < data.users.length; i++) {
      streamerInfo.push(data.users[i]);
      streamerID.push(data.users[i]._id);
    }   
    // console.log(streamerInfo);
    // console.log(streamerID); // https://www.twitch.tv/nl_kripp
    let html = '';
    for (let i = 0; i < streamerInfo.length; i++) {
    // console.log('streamerInfo[i].name: ', streamerInfo[i].name);

    html = '<div class="card col-md-3 px-0 my-2" >' + 
    '<img class="card-img-top ' + streamerInfo[i].name + 'Logo' +' filter" src="'  + streamerInfo[i].logo + '" alt="' + streamerInfo[i].display_name + '">'+ 
    '<div class="card-body ">' +
    '<h5 class="card-title">'+ '<a href=https://www.twitch.tv/' + streamerInfo[i].name + '>'+ streamerInfo[i].display_name + '</a></h5>' +  
    '<block class="badge badge-secondary status ' + streamerInfo[i].name + '">Offline</block>' +
    '<p class="card-text streaming ' + streamerInfo[i].name + 'playing">'  + '</p>'+
    '</div></div>';
    $('.streamerlist').append(html);
    // console.log('html: ', html);
    }  
})
  .then(() => {
    fetch(endPoint2 + streamerID.join(','), {
      method: 'GET',
        headers: {
        'Client-ID': '6vraacbw7vxpj9x3tjg969gnl4rovf', 
        'Accept': 'application/vnd.twitchtv.v5+json'
        }
    }).then(blob => blob.json())
      .then(function(data) { 
      // console.log(data);
      for (var i = 0; i < data.streams.length; i++ ) {
        for (var j = 0; j < streamerInfo.length; j++) {
          if (data.streams[i].channel._id == streamerInfo[j]._id) {
            // console.log(streamerInfo[j].display_name + ' is streaming!');
            $('.'+streamerInfo[j].name).text('Online');
            $('.'+streamerInfo[j].name).removeClass('badge-secondary').addClass('badge-primary');
            $('.'+streamerInfo[j].name+'Logo').removeClass('filter');
            $('.'+streamerInfo[j].name+'playing').text(data.streams[i].channel.game);
          }
        } 
      } 
    })
});
