const tweet_body = document.querySelector('.tweet-body');
const tweetInput = document.querySelector('.tweet-input-box');
const tweetBtn = document.querySelector('.tweet-btn');
const deleteBtn = document.querySelector('.delete-btn');
const tweetNumber = document.querySelector('.tweet-number');
const tweetSearch = document.querySelector('.data-search');
const msg = document.querySelector('.msg');
const wordCount = document.querySelector('.word-count span');


wordCount.innerHTML = 0;
// Tweet Object Array
let tweetData = [
    // {
    //     id: 0,
    //     tweetText: "Mahmud",
    //     tweetTime: "10:20"
    // },
    // {
    //     id: 1,
    //     tweetText: "Fahim",
    //     tweetTime: "10:30"
    // },
    // {
    //     id: 2,
    //     tweetText: "Fuad",
    //     tweetTime: "10:40"
    // },
    // {
    //     id: 3,
    //     tweetText: "Sonia",
    //     tweetTime: "10:50"
    // }
];

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
                    <i class="fa fa-clock float-right"> ${moment().startOf('tweet.tweetTime').fromNow()}</i>`;
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
        tweetData.push({
            id,
            tweetText,
            tweetTime
        });
    }
    tweet_body.innerHTML = '';
    tweetDataElement(tweetData);
    tweetInput.value = '';
    wordCount.innerHTML = 0;
});

// Tweet Delete
tweet_body.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete-btn')){
        // Remove from UI
        const target = e.target.parentElement.parentElement;
        e.target.parentElement.parentElement.parentElement.removeChild(target);
        // Remove data from storage/Object Array
        const id = parseInt(target.id.split('-')[1]);
        let result = tweetData.filter(product => {
            return product.id !== id;
        });
        tweetData = result;
    }
});

tweetSearch.addEventListener('keyup', (e) => {
    const searchText = e.target.value.toLowerCase();
    console.log(searchText);
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
    // tweetInput.addEventListener('keydown', (e) => {
    //     if(inputVal >= 50){
    //         e.preventDefault()
    //     }
    // });
});
