//article button vars
var articleBtn = document.querySelector("#get-articles");
var articlePrev = document.querySelector("#article-prev");
var articleNext = document.querySelector("#article-next");

// important div vars
var articleDiv = document.getElementById("articles");
var menuDiv = document.getElementById("menu");

// request info vars
var type = "articles";
var resultLimit = 10;
var pageReq = 0;

// summary_contains=launch&

var articleList = document.querySelector("#list-articles");

var requestSpaceInfo = function(infoType){
    var requestUrl = 'https://api.spaceflightnewsapi.net/v3/'+type+'?_start='+pageReq+'&_limit='+resultLimit;

    // disable prev button if page req is 0
    if(pageReq === 0){
        articlePrev.disabled=true;
    }
    else{
        articlePrev.disabled=false;
    }
    
    // fetch spaceflight news
    fetch(requestUrl)
    .then((res) => res.json())
        .then(function(data){
            // if infoType equals "articles"...
            if(infoType === "articles"){
                for(var i = 0; i < data.length; i++){
                    // stringify data
                    var object = JSON.stringify(data[i]);
                    object = JSON.parse(object)
            
                    // create article card
                    var articleCard = document.createElement("div");
                    articleCard.className="article-card";
                    articleCard.id="article-"+object.id;

                    // create article image and attach it to article card
                    var articleImg = document.createElement("img");
                    articleImg.className="article-img";
                    articleImg.src = object.imageUrl;
                    articleCard.appendChild(articleImg);
                    
                    // create article info div and attach to article card
                    var articleInfo = document.createElement("div");
                    articleInfo.className="article-info";
                    articleCard.appendChild(articleInfo);
                    
                    // create article title and attach it to article info div
                    var articleTitle = document.createElement("h3");
                    articleTitle.className="article-title";
                    articleTitle.textContent=object.title;
                    articleInfo.appendChild(articleTitle);
                    
                    // create article site and attach to article div info
                    var articleSite = document.createElement("h4");
                    articleSite.classList="article-news-site";
                    articleSite.textContent="By: "+object.newsSite;
                    articleInfo.appendChild(articleSite);
                    
                    // create article summary and attach to article info div
                    var articleSum = document.createElement("p");
                    articleSum.className="article-summary";
                    articleSum.textContent=object.summary;
                    articleInfo.appendChild(articleSum);
            
                    // attach article card to article list
                    articleList.appendChild(articleCard);
                }
            }
        });
};

// function to get previous article page
var articlePrevPage = function(){
    pageReq = pageReq - resultLimit;
    while(articleList.firstChild){
        articleList.removeChild(articleList.firstChild);
    }
    requestSpaceInfo("articles");
}

// function to get next article page
var articleNextPage = function(){
    pageReq = pageReq + resultLimit;
    console.log("Page number: "+pageReq);
    while(articleList.firstChild){
        articleList.removeChild(articleList.firstChild);
    }
    requestSpaceInfo("articles");
};

// function to show articles
var showArticles = function(){
    menuDiv.style.display = "none";
    articleDiv.style.display="flex";
    mainContainer.style.height="200px";
    requestSpaceInfo("articles");
};

// article buttons
articleBtn.addEventListener("click", showArticles);
articlePrev.addEventListener("click", articlePrevPage);
articleNext.addEventListener("click", articleNextPage);