/** @function generateCardHTML 
 * Generates the appropriate HTML for the supplied card data 
 * @param {object} cardData - An object describing a card 
 * @returns {string} the generated HTML 
 */
module.exports = function generateCardHTML(cardData) {
    // TODO: Generate appropriate HTML
    
    //Parse .JSON type
    var type = cardData.type;
    
    //Determine content type
    if (type== "audio") return generateAudioCardHTML(cardData);
    if (type== "article") return generateArticleCardHTML(cardData);
    if (type== "gallery") return generateGalleryCardHTML(cardData);
    if (type== "video") return generateVideoCardHTML(cardData);
    
}

/** @function generateAudioCardHTML
 * A helper function to generate audio card HTML 
 * @param {object} cardData - the audio card data 
 * @returns {string} the generated html 
 */
function generateAudioCardHTML(cardData) {
    // TODO: Generate appropriate HTML
    // Parse .JSON data
    var id = cardData.id; 
    var title = cardData.title;
    var description = cardData.description;
    var source = cardData.source;
    // HTML Snippett
    var html=
        `
        <div class="card" id="audio">              
            <div id="${id}">
            <center>
                <h2>${title}</h2>
                <audio controls><source src="${source}" type="audio/mpeg"></audio>
            </center>        

                 <p>${description}</p>
            
            </div>         
        </div> 
       
        `
    return html;
}

/** @function generateArticleCardHTML
 * A helper function to generate article card HTML 
 * @param {object} cardData - the article card data 
 * @returns {string} the generated html 
 */
function generateArticleCardHTML(cardData) {
    // TODO: Generate appropriate HTML
    // Parse .JSON data
    var id = cardData.id; 
    var title = cardData.title;
    var body = cardData.body;
    // HTML snippet
    var html=
        `
    
        <div class="card" id ="article">
           <div class="card" id="buttonbottom">                
            <center>
                <button onclick="expand_article_box()" type="button" id="read">Read More</button>
            </center>                
            <div id="${id}">
                <button  type="button" id="close" onclick="close_article_box()" style="display:none" align="left">&times; Close</button>
                <center>
                    <h2>${title}</h2>
                </center>
                <p>${body}</p>
            </div>
            <br>

            </div>
        </div>
        `
    return html;
}

/** @function generateGalleryCardHTML
 * A helper function to generate gallery card HTML 
 * @param {object} cardData - the gallery card data 
 * @returns {string} the generated html 
 */
function generateGalleryCardHTML(cardData) {
    // TODO: Generate appropriate HTML
    // parse .JSON data
    var id = cardData.id;
    var title = cardData.title;
    var description = cardData.description;
    var images = cardData.images;
    //HTML snippet
    var html = 
        `
        <div class="card" id="back">
            <div id="workplease" id ="${id}">
                <button onclick="contract_gallery()" type="button" id="close_gallery" style="display:none" align="left">&times; Close</button>
                <center>                    
                    <h2>${title}</h2>
                </center>
            </div>
            <div id="gallerybox" class="inactive">


                <img class="pic" id="pic1" src="${images[0]}">
                <img class="pic" id="pic2" src="${images[1]}" style="display:none">
                <div class="inactive" id="gtext">
                <p>${description}</p>
                </div>
                <img class="pic" id="pic3" src="${images[2]}" style="display:none">
                <img class="pic" id="pic4" src="${images[3]}" style="display:none">
                <img class="pic" id="pic5" src="${images[4]}" style="display:none">
                <img class="pic" id="pic6" src="${images[5]}" style="display:none">
                <img class="pic" id="pic7" src="${images[6]}" style="display:none">
                <img class="pic" id="pic8" src="${images[7]}" style="display:none">
            </div>
            <center>
                <button type="button" onclick="expand_gallery()" id="gbutton" >See Gallery</button>
            </center>                  
        </div>
`
    return html;
}

/** @function generateVideoCardHTML
 * A helper function to generate video card HTML 
 * @param {object} cardData - the video card data 
 * @returns {string} the generated html 
 */
function generateVideoCardHTML(cardData) {
    // TODO: Generate appropriate HTML
    // Parese .JSON data
    var id = cardData.id; 
    var title = cardData.title;
    var description = cardData.description;
    var source = decodeURIComponent(cardData.source); //Decodes but still won't find path
    // HTML snippet
    var html = 
        `
        <div class="card" id="video">              
            <div id="${id}">
            <center>
                <h2>${title}</h2>
                   <video width="300" controls>
                      <source src="${source}" type="video/mp4">
                   </video>
            </center>        
                 
                 <p>${description}</p>
           
            </div>         
        </div> 
`
    return html;
}
