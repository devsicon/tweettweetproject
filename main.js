const tweet_body = document.querySelector('.tweet-body');
const tweetInput = document.querySelector('.tweet-input-box');
const tweetBtn = document.querySelector('.tweet-btn');
const deleteBtn = document.querySelector('.delete-btn');
const editBtn = document.querySelector('.edit-btn');
const tweetNumber = document.querySelector('.tweet-number');
const tweetSearch = document.querySelector('.data-search');
const msg = document.querySelector('.msg');
const wordCount = document.querySelector('.word-count span');
const updateBtnPlace = document.querySelector('p.word-count');

wordCount.innerHTML = 0;

// Get Data From LocalStorage
let tweetData = getDataFromLocalStorage();

function getDataFromLocalStorage(){
    let tweets = "";
    if(localStorage.getItem('tweetItems') === null){
        tweets = [];
    }else{
        tweets = JSON.parse(localStorage.getItem('tweetItems'));
    }
    return tweets;
}

// Save Data to LocalStorage
function saveDataToLocalStorage(tweet){
    let tweets = "";
    if(localStorage.getItem('tweetItems') === null){
        tweets = [];
        tweets.push(tweet)
        localStorage.setItem('tweetItems', JSON.stringify(tweets))
    }else{
        tweets = JSON.parse(localStorage.getItem('tweetItems'));
        tweets.push(tweet)
        localStorage.setItem('tweetItems', JSON.stringify(tweets))
    }
}
// Delete Data from LocalStorage
function deleteItemFromLocalStorage(id){
    const tweets = JSON.parse(localStorage.getItem('tweetItems'));

    // return result array
    let result = tweets.filter(tweetItems => {
        return tweetItems.id !== id;
    });
    localStorage.setItem('tweetItems', JSON.stringify(result))
    if(result.length === 0){
        location.reload();
    }
}
// Display Tweet from Object Array
function tweetDataElement(tweetDataList){
    
    if(tweetDataList.length > 0){
        tweetDataList.forEach(tweet => {
            let single_tweet_div = document.createElement('div');
                single_tweet_div.className = "single-tweet";
                single_tweet_div.id = `product-${tweet.id}`;
            let tweet_number = document.createElement('div');
                tweet_number.className = "tweet-number";
                tweet_number.innerHTML = `${tweet.id}.`;               
                single_tweet_div.append(tweet_number);
            let tweet_text = document.createElement('div');
                tweet_text.className = "tweet-text";
                tweet_text.innerHTML = `${tweet.tweetText}`;
                single_tweet_div.append(tweet_text);
            let tweet_extra = document.createElement('div');
                tweet_extra.className = "tweet-extra";
                tweet_extra.innerHTML = `
                    <i class="fa fa-trash float-right delete-btn"></i>
                    <i class="fa fa-edit float-right edit-btn"></i>
                    <i class="fa fa-clock float-right">${moment().startOf(tweet.tweetTime).fromNow() }</i>`;
                    // ${tweet.tweetTime} moment().startOf(tweet.tweetTime).fromNow() 
                single_tweet_div.append(tweet_extra);
                tweet_body.append(single_tweet_div);
        });
    }
}
tweetDataElement(tweetData);

// Create New Tweet
tweetBtn.addEventListener('click', (e) => {
    e.preventDefault()
    let tweetText = tweetInput.value;
    let id;
    let tweetTime = new Date();
    if(tweetData.length === 0){
        id = 0;
    }else{
        id = tweetData[tweetData.length - 1].id + 1;
    }
    if(tweetText === ''){
        alert('Data must be input')
    }else{
        const data = {
            id,
            tweetText,
            tweetTime
        };
        tweetData.push(data)
        tweet_body.innerHTML = '';
    saveDataToLocalStorage(data)
    tweetDataElement(tweetData);
    tweetInput.value = '';
    wordCount.innerHTML = 0;
    }
    
});

function findTweetById(id){
    return tweetData.find(tweetItems => tweetItems.id === id)
}
// Tweet Delete Edit/Update
tweet_body.addEventListener('click', (e) => {
    const target = e.target.parentElement.parentElement;
    const id = parseInt(target.id.split('-')[1]);

    if(e.target.classList.contains('delete-btn')){

        e.target.parentElement.parentElement.parentElement.removeChild(target);
       
        let result = tweetData.filter(product => {
            return product.id !== id;
        });
        tweetData = result;
        deleteItemFromLocalStorage(id);
    }else if(e.target.classList.contains('edit-btn')){
        const foundTweet = findTweetById(id)
        if(!foundTweet){
            alert('error: Invalid Data')
        }
        tweetInput.value = foundTweet.tweetText


        // Hide Tweet Button
        tweetBtn.style.display = 'none'
        //Create Update Button
        const updateBtnEle = `<button type='submit' class='btn cst-btn update-product'>Update</button> `;
        updateBtnPlace.insertAdjacentHTML('afterend', updateBtnEle);

        //Add event listener Update button
        document.querySelector('.update-product').addEventListener('click', (e) => {
            if(tweetInput.value === ''){
                alert('Please fill out the tweet box')
            }else{
                tweetData = tweetData.map((tweetItems) => {
                    if(tweetItems.id === id){
                        return {
                        ...tweetItems,
                        tweetText: tweetInput.value
                        }
                        
                    }else{
                        return tweetItems
                    }
                })
                tweetDataElement(tweetData)
                localStorage.setItem('tweetItems', JSON.stringify(tweetData))
            }
        })

    }
});

tweetSearch.addEventListener('keyup', (e) => {
    const searchText = e.target.value.toLowerCase();
   
    document.querySelectorAll('.tweet-body .single-tweet').forEach(tweet => {

        const tweetName = tweet.children[1].textContent.toLowerCase();
        if(tweetName.indexOf(searchText) === -1){
            msg.innerHTML = 'No Item to Show';
            tweet.style.display = 'none';
        }else{
            msg.innerHTML = '';
            tweet.style.display = 'block';
        }
    }); 
});


tweetInput.addEventListener('keyup', (e) => {
    let inputVal = tweetInput.value.length;
    wordCount.innerHTML = inputVal;
});
