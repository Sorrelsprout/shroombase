$(document).ready(function(){
    checkWidth();
    $(window).resize(function() { checkWidth(); })
    function checkWidth() {
        if ($(window).width() < 1200) {
            $("body").addClass("mobile");
        } else {
            $("body").removeClass("mobile");
            $(".mobileMenu").css({ "transition": "none" })
        }

        if ($(window).width() < 768) {
            $("#mushroomsFungiTitle").attr("src", "./images/about/mushroomsfungi-mobile.png");
        } else {
            $("#mushroomsFungiTitle").attr("src", "./images/about/mushroomsfungi.png");
        }
    }

    $(".triplebar").click(function() {
        $(".mobileMenu").css({ 
            "transition": "all 0.5s cubic-bezier(0.5, 0, 0.5, 1)",
            "transition-timing-function":"cubic-bezier(0.5, 0, 0.5, 1)"
        })
        $(".mobileMenu").toggleClass("expanded");;
    });
    $(".mobile .mobileMenu a").click(function() {
        $(".mobileMenu").removeClass("expanded");;
    });

    $(".currentYear").html(new Date().getFullYear());



/* H E R O  -------------------------------------------------------------------------------------- */

    let conHeight = $("#pullup .hero").height();
    let imgHeight = $("#pullup .hero img").height();
    let gap = (imgHeight - conHeight) / 2;
    $("#pullup .hero img").css("top", -gap);
    


/* S E T U P   F U N G I   G R I D --------------------------------------------------------------- */
    
    $("#fungiGrid").children().each(function(location){
        let fungusID = $(this).attr("id");
        let fungusTitle = $(this).attr("title");
        $(this).addClass("fungiGridElement");

        let fungusIMGFileName = fungusID.replace('-', '');
        let fungusFamilyExtract = $(this).attr("class").replace(' fungiGridElement', '')
        fungusIMGFileName = "./images/" + fungusFamilyExtract + "/" + $(this).attr("id") + "/" + fungusIMGFileName + ".jpg";
        let fungusIMGHTML = "<img src='" + fungusIMGFileName + "' alt='" + fungusTitle + "' loading='lazy'>";

        let scientificNameRestructured = fungusID.replace('-', ' ')
        scientificNameRestructured = scientificNameRestructured.charAt(0).toUpperCase() + scientificNameRestructured.slice(1)
        let fungusDESC = "<div class='fungiDescription'><p>" + fungusTitle + "</p><p>" + scientificNameRestructured + "</p></div>";

        $(this).append(fungusIMGHTML);
        $(this).append(fungusDESC);
     });
   
     

/* I N I T I A L   P U L L U P  ------------------------------------------------------------------ */

/* Preload some content */
$("#pullupContent .hero h1").html("Template");
$("#pullupContent .fullDescription").load("./fungi/template.html");
preloadPullup("./fungi/template.json");

function preloadPullup(JSONURL) {
    $.getJSON(JSONURL, function(json) { 
        let shroom = Object.values(json);
        
        /* Tags */
        $("#tags-poisonousEdible").html(shroom[0].edibility);
        $("#tags-poisonousEdible").removeClass().addClass(shroom[0].edibility);
        if (shroom[0].edibility == "") { $("#tags-poisonousEdible").css({"display":"none"}) }

        arrayResponse("#tags-treeRelation", shroom[0].treelationship);

        $("#tags-type").html(shroom[0].type);
        $("#tags-type").removeClass().addClass(shroom[0].type);
        if (shroom[0].type == "") { $("#tags-type").css({"display":"none"}) }
        
        /* Division */
        $("#nomenclature-division").html(shroom[1].division);
        if (shroom[1].division == "") { $("#nomenclature-division-container").css({"display":"none"}) }
        $("#nomenclature-class").html(shroom[1].class);
        if (shroom[1].class == "") { $("#nomenclature-class-container").css({"display":"none"}) }
        $("#nomenclature-order").html(shroom[1].order);
        if (shroom[1].order == "") { $("#nomenclature-order-container").css({"display":"none"}) }
        $("#nomenclature-family").html(shroom[1].family);
        if (shroom[1].family == "") { $("#nomenclature-family-container").css({"display":"none"}) }
        $("#nomenclature-genus").html(shroom[1].genus);
        if (shroom[1].genus == "") { $("#nomenclature-genus-container").css({"display":"none"}) }
        $("#nomenclature-species").html(shroom[1].species);
        if (shroom[1].species == "") { $("#nomenclature-species-container").css({"display":"none"}) }
        $("#nomenclature-variation").html(shroom[1].variation);
        if (shroom[1].variation == "") { $("#nomenclature-variation-container").css({"display":"none"}) }
        $("#nomenclature-aliases").html(shroom[1].aliases);
        if (shroom[1].aliases == "") { $("#nomenclature-aliases-container").css({"display":"none"}) }
        // $("#nomenclature-displayalias").html(shroom[1].displayalias);
        
        /* Distinguishing Features */
        // $("#distinguishing-coverimg").attr("src", shroom[2].coverimg);
        $("#distinguishing-abundancy").html(shroom[2].abundancy);
        if (shroom[2].abundancy == "") { $("#distinguishing-abundancy-container").css({"display":"none"}) }
        $("#distinguishing-smell").html(shroom[2].smell);
        if (shroom[2].smell == "") { $("#distinguishing-smell-container").css({"display":"none"}) }
        $("#distinguishing-size").html(shroom[2].size);
        if (shroom[2].size == "") { $("#distinguishing-size-container").css({"display":"none"}) }
        $("#distinguishing-tidbits").html(shroom[2].tidbits);
        if (shroom[2].tidbits == "") { $("#distinguishing-tidbits-container").css({"display":"none"}) }
        
        /* Caracteristics */
        $("#characteristics-cap-img").attr("src", shroom[3].cap.img);
        $("#characteristics-cap-caption").html(shroom[3].cap.caption);
        $("#characteristics-cap-desc").html(shroom[3].cap.desc);
        $("#characteristics-underside-img").attr("src", shroom[3].underside.img);
        $("#characteristics-underside-caption").html(shroom[3].underside.caption);
        $("#characteristics-underside-desc").html(shroom[3].underside.desc);
        $("#characteristics-side-img").attr("src", shroom[3].side.img);
        $("#characteristics-side-caption").html(shroom[3].side.caption);
        $("#characteristics-side-desc").html(shroom[3].side.desc);
        $("#characteristics-halved-img").attr("src", shroom[3].halved.img);
        $("#characteristics-halved-caption").html(shroom[3].halved.caption);
        $("#characteristics-halved-desc").html(shroom[3].halved.desc);
        $("#characteristics-stem-img").attr("src", shroom[3].stem.img);
        $("#characteristics-stem-caption").html(shroom[3].stem.caption);
        $("#characteristics-stem-desc").html(shroom[3].stem.desc);
        $("#characteristics-sporeprint-img").attr("src", shroom[3].sporeprint.img);
        $("#characteristics-sporeprint-caption").html(shroom[3].sporeprint.caption);
        $("#characteristics-sporeprint-desc").html(shroom[3].sporeprint.desc);
        $("#characteristics-mycelium-img").attr("src", shroom[3].mycelium.img);
        $("#characteristics-mycelium-caption").html(shroom[3].mycelium.caption);
        $("#characteristics-mycelium-desc").html(shroom[3].mycelium.desc);
        $("#characteristics-habitat-img").attr("src", shroom[3].habitat.img);
        $("#characteristics-habitat-caption").html(shroom[3].habitat.caption);
        $("#characteristics-habitat-desc").html(shroom[3].habitat.desc);
        $("#characteristics-bruising-img").attr("src", shroom[3].bruising.img);
        $("#characteristics-bruising-caption").html(shroom[3].bruising.caption);
        $("#characteristics-bruising-desc").html(shroom[3].bruising.desc);
        $("#characteristics-koh-img").attr("src", shroom[3].koh.img);
        $("#characteristics-koh-caption").html(shroom[3].koh.caption);
        $("#characteristics-koh-desc").html(shroom[3].koh.desc);
        $("#characteristics-latex-img").attr("src", shroom[3].latex.img);
        $("#characteristics-latex-caption").html(shroom[3].latex.caption);
        $("#characteristics-latex-desc").html(shroom[3].latex.desc);
        $("#characteristics-bioluminescence-img").attr("src", shroom[3].bioluminescence.img);
        $("#characteristics-bioluminescence-caption").html(shroom[3].bioluminescence.caption);
        $("#characteristics-bioluminescence-desc").html(shroom[3].bioluminescence.desc);
        
        /* Fruit Season */
        arrayResponse("#lifestages-fruitseason", shroom[4].fruitseason);
        let lifestages_img = [ shroom[4].images.fruiting.img, shroom[4].images.egg.img, shroom[4].images.eruption.img, shroom[4].images.button.img, shroom[4].images.mature.img, shroom[4].images.old.img ]
        let lifestages_desc = [ shroom[4].images.fruiting.desc, shroom[4].images.egg.desc, shroom[4].images.eruption.desc, shroom[4].images.button.desc, shroom[4].images.mature.desc, shroom[4].images.old.desc ]
        let lifestagesContent = "";
        for (let i=0; i<lifestages_img.length; i++) {
            const CURRENTIMG = lifestages_img[i];
            const CURRENTDESC = lifestages_desc[i];
            let currentlifestagesContent = "";
            if ( CURRENTIMG != "" ) {
                if (CURRENTDESC != "") {
                    currentlifestagesContent = "<label class='click-zoom'><figure><input type='checkbox'><img alt='lifeStage' src='"+ CURRENTIMG +"' loading='lazy'><figcaption>"+ CURRENTDESC +"</figcaption></figure></label>";
                } else {
                    currentlifestagesContent = "<label class='click-zoom'><figure><input type='checkbox'><img alt='lifeStage' src='"+ CURRENTIMG +"' loading='lazy'></figure></label>";
                }
            } else {
                if (lifestages_desc[i] != "") {
                    currentlifestagesContent = "<label class='click-zoom'><figure><input type='checkbox'><img alt='lifeStage' src='https://images.unsplash.com/photo-1454425064867-5ba516caf601?w=1000&h=1000&fit=crop&crop=focalpoint&fp-z=1.4&fp-x=0.45&fp-y=0.42' loading='lazy'><figcaption>Placeholder image. "+ CURRENTDESC +"</figcaption></figure></label>";
                } else { currentlifestagesContent = ""; }
            } lifestagesContent += currentlifestagesContent;
        }
        if (lifestagesContent == "") { $("#lifestages-images").css({"display":"none"}); }
        $("#lifestages-images").html(lifestagesContent);
        
        /* Significance */
        $("#significance-scientific").html(shroom[5].scientific.scientific);
        if (shroom[5].scientific.scientific == "") { $("#significance-scientific-container").css({"display":"none"}) }
        $("#significance-environmental").html(shroom[5].scientific.environmental);
        if (shroom[5].scientific.environmental == "") { $("#significance-environmental-container").css({"display":"none"}) }
        $("#significance-gene").html(shroom[5].scientific.genetic);
        if (shroom[5].scientific.genetic == "") { $("#significance-gene-container").css({"display":"none"}) }

        $("#significance-cultural").html(shroom[5].cultural.cultural);
        if (shroom[5].cultural.cultural == "") { $("#significance-cultural-container").css({"display":"none"}) }
        $("#significance-medicinal").html(shroom[5].cultural.medicinal);
        if (shroom[5].cultural.medicinal == "") { $("#significance-medicinal-container").css({"display":"none"}) }
        $("#significance-facts").html(shroom[5].cultural.facts);
        if (shroom[5].cultural.facts == "") { $("#significance-facts-container").css({"display":"none"}) }

        $("#significance-cullinary").html(shroom[5].cullinary.cullinary);
        if (shroom[5].cullinary.cullinary == "") { $("#significance-cullinary-container").css({"display":"none"}) }
        $("#significance-taste").html(shroom[5].cullinary.taste);
        if (shroom[5].cullinary.taste == "") { $("#significance-taste-container").css({"display":"none"}) }
        arrayResponse("#significance-recipes", shroom[5].cullinary.recipelist);
        if (shroom[5].cullinary.recipelist == "") { $("#significance-recipes-container").css({"display":"none"}) }
        
        /* Geography */
        // $("#geography-region").html(shroom[6].region);
        $("#geography-fruitLocation").html(shroom[6].fruitlocation);
        // $("#geography-coordinates").html(shroom[6].coordinates);
        
        /* Lookalikes */
        let lookalikeContent = "";
        if (shroom[7].names.length == 0) { $("#lookalikes").css({"display":"none"}); }
        else {
            for (let i=0; i<shroom[7].names.length; i++) {
                let edibilityIcon = "";
                if ( shroom[7].edibility[i] == "poisonous") { edibilityIcon = "☠️ " + shroom[7].names[i] + " is not edible" }
                else if ( shroom[7].edibility[i] == "edible")  { edibilityIcon = "🍴" + shroom[7].names[i] + " is edible" }
                lookalikeContent += "<div title='" + edibilityIcon + "'><figure>\
                    <img src='" + shroom[7].images[i] + "' alt='lookalike' loading='lazy'>\
                    <figcaption>"+ shroom[7].caption[i] +"<figcaption></figure>\
                    <h3 class=" + shroom[7].edibility[i] + ">" + shroom[7].names[i] + "</h3>\
                    <p>" + shroom[7].desc[i] + "</p>\
                </div>"
            }
            $("#lookalikes").css({"display":"block"});
            $("#lookalikeGrid").html(lookalikeContent);
        }

        function arrayResponse(tagName, arrayToList) {
            if ( arrayToList.length > 0 ) {
                let basetags = "";
                for (let i=0; i<arrayToList.length; i++) { 
                    basetags += "<li>" + arrayToList[i] + "</li>";
                }
                $(tagName).html(basetags); 
            } else {
                $(tagName).css({"display":"none"});
            }
        }
    });
}

/* P U L L U P  ---------------------------------------------------------------------------------- */

    $("#fungiGrid > div").click(function() { 
        /* Get Project ID */
        const PROJECTINDEX = $(this).index();
        const FUNGIID = $("#fungiGrid > div:nth-child("+(PROJECTINDEX+1)+")").attr("id");

        const ENDOFFAMILY = $("#fungiGrid > div:nth-child("+(PROJECTINDEX+1)+")").attr("class").indexOf(" ");
        const FUNGIFAMILY = $("#fungiGrid > div:nth-child("+(PROJECTINDEX+1)+")").attr("class").substring(0,ENDOFFAMILY)

        /* Project Hero Image Setup */
        const PROJECTIMGURL = $("#"+(FUNGIID)+" img").attr("src");
        const PROJECTHERO = "url("+PROJECTIMGURL+")";
        $("#pullupContent .hero").css({ 
            "background":PROJECTHERO, 
            "background-position":"50% 50%",
            "background-size":"cover",
            "background-repeat":"no-repeat" 
        });

        /* Project Name Setup */
        const PNAME = "#"+(FUNGIID)+" p:first-of-type";
        const PROJECTNAME = $(PNAME).text();
        $("#pullupContent .hero h1").html(PROJECTNAME);
        const PSUB = "#"+(FUNGIID)+" p:nth-child(2)";
        const PSUBNAME = $(PSUB).text();
        $("#pullupContent .hero p").html(PSUBNAME);

        /* Project Content Setup */
        const PROJECTDESC = "./fungi/template.html";
        $("#pullupContent .fullDescription").load(PROJECTDESC); 



/* F U N G I   D A T A B A S E   S E T U P ------------------------------------------------------- */

        const JSONURL = "./fungi/" + (FUNGIFAMILY) + "/" + (FUNGIID) + ".json";
        preloadPullup(JSONURL);
        setPullup();
    });

    /* Tags: For new tags, update TAGPREFIX, TAGOBJECTS, and NEWTAGOBJECTS */
    for(let i=0; i<$(".fungiGridElement").length; i++) {
        const FUNGIID = $(".fungiGridElement:nth-child("+(i+1)+")").attr("id");
        const FUNGIFAMILY = $(".fungiGridElement:nth-child("+(i+1)+")").attr("class").replace(' fungiGridElement', '');

        const JSONURL = "./fungi/" + (FUNGIFAMILY) + "/" + (FUNGIID) + ".json";
        $.getJSON(JSONURL, function(json) { 
            let shroom = Object.values(json);
            let fungiID = shroom[1].genus.toLowerCase()+"-"+shroom[1].species.toLowerCase();

            const TAGPREFIX = ["edibility", "type", "treelationship", "color", "region", "fruitseason"];
            const TAGOBJECTS = [shroom[0].edibility, shroom[0].type, shroom[0].treelationship, shroom[0].color, shroom[6].region, shroom[4].fruitseason];
            let NEWTAGOBJECTS = ["","","","","",""];

            $("#fungiGrid").children().each(function(location){
                for (let i=0; i<TAGPREFIX.length; i++) {
                    NEWTAGOBJECTS[i] = TAGOBJECTS[i] + "";
                    setFungiClasses(fungiID, TAGPREFIX[i], NEWTAGOBJECTS[i].toLowerCase().replaceAll(' ', '')); 
                }
            });
        });
    }
    
    function setFungiClasses(shroomName, tagPrefix, tagSuffix) {
        if(tagSuffix) {
            let shroomNameID = "#" + shroomName;
            let fullShroomClass = $(shroomNameID).attr('class');
            let fullShroomClassString = fullShroomClass + "";
            let newTag = tagSuffix;

            if(fullShroomClassString.indexOf(tagPrefix) >= 0){
                let oldTag = "";
                startTag = fullShroomClassString.lastIndexOf(tagPrefix);
    
                if(startTag >= 0) {
                    endTag = fullShroomClassString.indexOf(" ",startTag+1);
                    if (endTag >= 0) { oldTag = fullShroomClassString.substring(startTag,endTag-startTag); } 
                    else { oldTag = fullShroomClassString.substring(startTag,fullShroomClassString.length-startTag); }
                }
                fullShroomClassString.replace(oldTag, newTag);
            } else { $(shroomNameID).addClass(newTag); }
        }
    }



/* S E A R C H   B A R  -------------------------------------------------------------------------- */
    $("#badsearch").addClass("hidden");
    let searchBarString = "";
    
    /* Search Bar */
    $("#searchbar").change(function() {
        let inputTag = $("#searchbar").val();

        $("#badsearch").addClass("hidden");
        if(!/\S/.test(inputTag)) { // when a whitespace character is searched
            for (let i=0; i < $("#fungiGrid > div").length; i++) { // show all entries
                $(".fungiGridElement:nth-of-type("+(i+1)+")").removeClass("hidden");
            }
        } else {
            for (let i=0; i < $("#fungiGrid > div").length; i++) {
                let trackedFungus = $("#fungiGrid > div:nth-of-type("+(i+1)+")");
                let matchTag = trackedFungus.attr("id")+trackedFungus.attr("id") + trackedFungus.attr("class").replace(' fungiGridElement', '') + trackedFungus.attr("title");

                matchTag = matchTag.toLowerCase();
                let tagTest = inputTag.toLowerCase();
                tagTest = tagTest.replace(/\s+/g, '');
                if(matchTag.indexOf(tagTest) >= 0) { 
                    $(trackedFungus).removeClass("hidden");
                } else { 
                    $(trackedFungus).addClass("hidden");
                }
            }
            if(($("#fungiGrid > div").length) === $("#fungiGrid > div.hidden").length) { // When search term can't be found
                $("#badsearch").removeClass("hidden");
                $("#badsearch span").html(inputTag);
            } else {
                $("#badsearch").addClass("hidden");
            }
        }
        searchBarString = inputTag;
    });
    
    $(".inputSelect").change(function() {
        let specimens = [];
        for(let i=0; i<$(".fungiGridElement").length; i++) {
            const SPECIMENTAGS = $(".fungiGridElement:nth-child("+(i+1)+")").attr("class");
            specimens.push(SPECIMENTAGS)
        }
        updateHiddenFungi(specimens);
    });

/* S E A R C H   T A G S  ------------------------------------------------------------------------ */

    function updateHiddenFungi(specimens) {
        let currentlySelectedTags = []
        for(let i=0; i < $(".inputSelect").length; i++) {
            currentlySelectedTags.push( $(".inputSelect:nth-child(" + (i+1) + ") option:selected").text() )
        }

        let specimenTagTracker = []
        for(let i=0; i < $(".fungiGridElement").length; i++) {
            let specimenTagCounter = 0;
            for(let j=0; j < $(".inputSelect").length; j++) {
                let currentSpecimenTags = specimens[i];
                let currentlySelectedTagsSimplified = currentlySelectedTags[j].toLowerCase().replaceAll(' ', '');

                if((currentSpecimenTags.indexOf(currentlySelectedTagsSimplified) >= 0)) {
                    specimenTagCounter += 0;
                } else if (currentlySelectedTagsSimplified == "all") { // Do Nothing
                } else {
                    specimenTagCounter+= 1;
                }
            }
            specimenTagTracker.push(specimenTagCounter);
        }

        for(let i=0; i < $(".fungiGridElement").length; i++) {
            if(specimenTagTracker[i] > 0){
                $(".fungiGridElement:nth-child("+(i+1)+")").addClass("hiddenTag")
            } else {
                $(".fungiGridElement:nth-child("+(i+1)+")").removeClass("hiddenTag")
            }
        }
    }



/* O P E N   P O P U P  -------------------------------------------------------------------------- */

    $("#terms").click(function() { 
        $("#pullupContent .fullDescription").load("pages/terms.html"); 
        $("#pullupContent .hero").css({ 
            "background": "url(https://images.unsplash.com/photo-1570161387493-1ad88c522eba?w=2000&h=1200&fit=crop&fp-y=0.420)", 
            "background-position":"50% 50%",
            "background-size":"cover",
            "background-repeat":"no-repeat" 
        });
        $("#pullupContent .hero h1").html("Terms to Know"); /* Project Name Setup */
        $("#pullupContent .hero p").html("");
        setPullup(); /* Project Content Setup */
    });

    $("#about").click(function() { 
        $("#pullupContent .fullDescription").load("pages/about.html"); 
        $("#pullupContent .hero").css({ 
            "background": "url(./images/about/banner-about.jpg)", 
            "background-position":"50% 50%",
            "background-size":"cover",
            "background-repeat":"no-repeat" 
        });
        $("#pullupContent .hero h1").html("About Shroombase"); /* Project Name Setup */
        $("#pullupContent .hero p").html("");
        setPullup(); /* Project Content Setup */
    });

    function setPullup() {
        $("#pullupContent").addClass("show");
        $("#pullup").addClass("show"); 
    }

    $("#pullupToggle").click(function() { hidePullup() });
    $("#logo").click(function() { hidePullup() });
    function hidePullup(){ 
        $("#pullup").removeClass("show"); 
        $("#pullup").animate({ scrollTop: 0 }, 100);
    }



/* T O G G L E   A D V A N C E D   S E A R C H --------------------------------------------------- */
    $("#searchAdvancedToggle").click(function() { 
        $("#searchAdvanced").toggleClass("showAdvanced");
        console.log("aaa")
    });
})
