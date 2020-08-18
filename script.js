const searchBtn=document.getElementById('searchBtn');
var inputSearch=document.getElementById('input');

searchBtn.addEventListener('click', ()=>{
 fetch("https://api.lyrics.ovh/suggest/"+ inputSearch.value +"")
 
.then(res=> res.json())
.then(data => jsonData(data))


});
// get the title,artist from lyrics api
function jsonData(data){
       const fetchSongItem=data.data;
       if(fetchSongItem.length == false){
              alert("Sorry put a valid name");
       }else{
              const fetchTenLSongName=fetchSongItem.slice(0,10);
              fetchTenLSongName.map(lyric =>{
                     const title=lyric.title;
                     const artist=lyric.artist.name;
                     setListData(title,artist);
              });
       }

       const lyricDiv=document.querySelector('.song-list-div').children;
       const lyricArray=[...lyricDiv];
       const newArray=lyricArray.slice(0,lyricArray.length-10);
     newArray.map(element => element.parentElement.removeChild(element));
     fetchLyricsData();

};
// set title and artist and lyrics with button;
function setListData(title,artist){
       const lyricsContainer = document.querySelector('.song-list-div');
       const divContainer = document.createElement('div');
       const div = document.createElement('div');
       div.classList.add('author','lead');
       const container = document.createElement('div');
  
       lyricsContainer.appendChild(divContainer);
       divContainer.appendChild(div);
       div.appendChild(container);
   
       createTag("strong", title, container);
       createTag('p',artist, container);
       createTag('button', "Get lyrics", div);
   };
// for avoiding duplicate use creating element
   function createTag(tag,text,appendTag)  {
       const generateTag = document.createElement(tag); 
       generateTag.innerText = text;
       appendTag.appendChild(generateTag);
   };
// get  lyrics by this function
 function  fetchLyricsData(){
       const lyricsBtns = document.querySelectorAll('.lead button');
       const lyricsBtnsArr = [...lyricsBtns];
       lyricsBtnsArr.map(btn => {
           btn.addEventListener('click', (e) => {
               const targetDiv = e.target.parentElement.parentElement;
               targetDiv.classList.toggle('showHide');
   
               const getTitle = targetDiv.querySelector('strong').innerText;
               const getArtist = targetDiv.querySelector('p').innerText;
               getlyricDiv(getArtist, getTitle,targetDiv);
           });
       });
   };

 

//lyric api
function getlyricDiv(artist, title,targetDiv) {
       fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
         .then(res => res.json())
         .then(json => displayLyrics(json,targetDiv))
   };
   
  //this is pre tag
 function  displayLyrics(data,targetDiv)  {
       if(targetDiv.classList.contains('showHide')){
           const getAuthor = document.querySelector('.showHide');
           const lyricsElement = document.createElement('pre');
           getAuthor.appendChild(lyricsElement)
           lyricsElement.innerText = data.lyrics;
       }else{
           targetDiv.removeChild(targetDiv.childNodes[1]);
       }
       
   };




















// let songList=document.getElementById('song-list-div');
// songList.style.display="none";

        //    document.querySelectorAll('.song').innerHTML=title1;
        //   document.getElementById('artist-1').innerHTML=albumBy;
        //     console.log(element.artist.name);
        //     console.log(element.album.title);



        //  for (let i = 0; i < data.data.length; i++) {
//   var element = data.data[i];
//      console.log(element.album);
//  }