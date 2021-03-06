const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags .list';
  

  

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;

  /* [DOME] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
};

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';

  /* for each article */
  for (const article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element and get the title from the title element*/
    const articleTitle = article.querySelector(optTitleSelector).innerText;

    /* create HTML of the link */
    const link = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;

    /* insert link into titleList */
    html += link;
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function calculateTagsParams(tags){
  const params = {max: 0, min: 999999};

  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if(tags[tag] > params.max) {
      params.max = tags[tag];
    }
    else (tags[tag] < params.min);
    params.min = tags[tag];
  }
  function generateTags(){ 
  /* [NEW] create a new variable allTags with an empty object  */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (const article of articles) {
  
      /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);

      /* make html variable with empty string */
      let html = '';
    
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags'); 
    
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
  
      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {

        /* generate HTML of the link */
        const link = `<li><a href="#tag-${tag}">${tag}</a></li>`;
      
        /* add generated code to html variable */
        html += link;

        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]) {
        /* [NEW] add tag to allTags object */
          allTags[tag] = 1; 
        } else {
          allTags[tag]++;
        }
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */  
      tagsWrapper.innerHTML = html
    
    /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);

    
 
    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
      allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + '(' + allTags[tag] + ')' + ' </a></li>';
    
    /* [NEW] END LOOP: for each tag in allTags: */
    }
    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
  /*paramscalculate tags a paramtert funkcji*/
  }
generateTags();
return params;
}
calculateTagsParams(tags);

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
 
  /* find all tag links with class active */
  const articleTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (const articleTag of articleTags) {

    /* remove class active */
    articleTag.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="#tag-' + href + '"]'); 
 
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add('active');
   
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}
function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('.post-tags a, .tags a');

  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}
addClickListenersToTags();


function generateAuthors(){
  const articles = document.querySelectorAll(optArticleSelector);

  for (const article of articles) {
    const authorsWrapper = article.querySelector(optArticleAuthorSelector);
    const articleAuthor = article.getAttribute('data-author');
    const link = `<a href="#author-${articleAuthor}">${articleAuthor}</a>`;
    authorsWrapper.innerHTML = link;
  }
}
generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  const articleAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  for (const articleAuthor of articleAuthors) {
    articleAuthor.classList.remove('active');
  }

  const authorLinks = document.querySelectorAll('a[href="#author-' + author + '"]'); 
  for (let authorLink of authorLinks) {
    authorLink.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('.post-author a');
  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();