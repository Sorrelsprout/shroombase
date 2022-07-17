$(document).ready(function(){
    // $.getScript("./scripts/trees.js");

    checkWidth();
    $(window).resize(function() { checkWidth(); })
    function checkWidth() {
        if ($(window).width() < 1200) {
            $("body").addClass("mobile");
        } else {
            $("body").removeClass("mobile");
            $(".mobileMenu").css({ "transition": "none" })
        }

        if ($(window).width() < 768) { $("#mushroomsFungiTitle").attr("src", "./images/about/mushroomsfungi-mobile.png"); } 
        else { $("#mushroomsFungiTitle").attr("src", "./images/about/mushroomsfungi.png"); }
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
        let fungusIMGHTML = "<img id='distinguishing-coverimg-" + fungusID + "' src='" + fungusIMGFileName + "' alt='" + fungusTitle + "' loading='lazy'>";

        let scientificNameRestructured = fungusID.replace('-', ' ')
        scientificNameRestructured = scientificNameRestructured.charAt(0).toUpperCase() + scientificNameRestructured.slice(1)
        let fungusDESC = "<div class='fungiDescription'><p>" + fungusTitle + "</p><p>" + scientificNameRestructured + "</p></div>";

        $(this).append(fungusIMGHTML);
        $(this).append(fungusDESC);
     });
   
     

/* I N I T I A L   P U L L U P  ------------------------------------------------------------------ */

/* Preload some content */
$("#pullupContent .hero h1").html("Template");
$("#pullupContent #fullDescription").load("./fungi/template.html");
preloadPullup("./fungi/template.json");

function preloadPullup(JSONURL) {
    $.getJSON(JSONURL, function(json) { 
        let shroom = Object.values(json);
        
        /* Tags */
        $("#tags-poisonousEdible").html(shroom[0].edibility);
        $("#tags-poisonousEdible").removeClass().addClass(shroom[0].edibility.toLowerCase().replaceAll(' ', ''));
        if (shroom[0].edibility == "") { $("#tags-poisonousEdible").css({"display":"none"}) }

        let treeCategories = []; //tree groups to be hidden in tags
        arrayResponse("#tags-treeRelation", shroom[0].treelationship);
        if (shroom[0].treelationship == "") { $("#tags-treelation-container").css({"display":"none"}) }

        arrayResponse("#tags-type", shroom[0].type);
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
        $("#distinguishing-abundancy").html(shroom[2].abundancy);
        if (shroom[2].abundancy == "") { $("#distinguishing-abundancy-container").css({"display":"none"}) }
        $("#distinguishing-smell").html(shroom[2].smell);
        if (shroom[2].smell == "") { $("#distinguishing-smell-container").css({"display":"none"}) }
        $("#distinguishing-size").html(shroom[2].size);
        if (shroom[2].size == "") { $("#distinguishing-size-container").css({"display":"none"}) }
        $("#distinguishing-tidbits").html(shroom[2].tidbits);
        if (shroom[2].tidbits == "") { $("#distinguishing-tidbits-container").css({"display":"none"}) }
        
        /* Characteristics */
        const CHARACTERISTICS_SUBCATEGORY = ["cap", "underside", "side", "halved", "stem", "sporeprint", "mycelium", "habitat"];
        const SPECIALHARACTERISTICS_SUBCATEGORY = ["bruising", "feso4", "koh", "nh4oh", "latex", "bioluminescence", "other"];

        characteristicsSetup(shroom[3], "#mainCharachteristics", CHARACTERISTICS_SUBCATEGORY);
        characteristicsSetup(shroom[3], "#specialCharacteristics", SPECIALHARACTERISTICS_SUBCATEGORY);

        function characteristicsSetup( JSONcategory, overallContainerID, subcategory ){
            let overallContainer = 0;

            for (let i=0; i<subcategory.length; i++) {
                let counter = 0;

                const CIMG = JSONcategory[subcategory[i]].img;
                const CCAPTION = JSONcategory[subcategory[i]].caption;
                const CDESC = JSONcategory[subcategory[i]].desc;
    
                const PLACEHOLDERIMG = "./images/templates/" + subcategory[i] + ".jpg"
                const TAGIMG = "#characteristics-" + subcategory[i] + "-img";
                const TAGCAPTION = "#characteristics-" + subcategory[i] + "-caption";
                const TAGDESC = "#characteristics-" + subcategory[i] + "-desc";
    
                $(TAGIMG).attr("src", CIMG); if (CIMG == "" || CIMG == PLACEHOLDERIMG) { counter++; }
                $(TAGCAPTION).html(CCAPTION); if (CCAPTION == "") { counter++; }
                $(TAGDESC).html(CDESC); if (CDESC == "") { counter++; }

                const CONTAINERNAME = "#" + subcategory[i] + "-container";
                if (counter == 3) { $(CONTAINERNAME).css({"display":"none"}); overallContainer++; }
            }
            if (overallContainer == subcategory.length) { $(overallContainerID).css({"display":"none"}); }
        }
        
        /* Fruit Season */
        let lifeStagesCounter = 0;
        arrayResponse("#lifestages-fruitseason", shroom[4].fruitseason);
        if (shroom[4].fruitseason == "") { $("#lifestages-fruitseason-container").css({"display":"none"}); lifeStagesCounter++; }
        
        $("#lifestages-lifespan").html(shroom[4].lifespan);
        if (shroom[4].lifespan == "") { $("#lifestages-lifespan-container").css({"display":"none"}); lifeStagesCounter++; }

        let lifestages_img = [ shroom[4].images.spore.img, shroom[4].images.egg.img, shroom[4].images.eruption.img, shroom[4].images.pin.img, shroom[4].images.button.img, shroom[4].images.young.img, shroom[4].images.mature.img, shroom[4].images.old.img, shroom[4].images.dead.img ];
        let lifestages_caption = [ shroom[4].images.spore.caption, shroom[4].images.egg.caption, shroom[4].images.eruption.caption, shroom[4].images.pin.caption, shroom[4].images.button.caption, shroom[4].images.young.caption, shroom[4].images.mature.caption, shroom[4].images.old.caption, shroom[4].images.dead.caption ];
        let lifestages_desc = [ shroom[4].images.spore.desc, shroom[4].images.egg.desc, shroom[4].images.eruption.desc, shroom[4].images.pin.desc, shroom[4].images.button.desc, shroom[4].images.young.desc, shroom[4].images.mature.desc, shroom[4].images.old.desc, shroom[4].images.dead.desc ];
        let lifestages_h3 = ["Spore", "Egg", "Eruption", "Pin", "Button", "Young", "Mature", "Old", "Dead"]

        let lifestagesContent = "";
        for (let i=0; i<lifestages_img.length; i++) {
            const CURRENTIMG = lifestages_img[i];
            const CURRENTCAPTION = lifestages_caption[i];
            const CURRENTDESC = lifestages_desc[i];
            const CURRENTH3 = lifestages_h3[i];

            let innerContent = "";
            let currentLifestageImgCounter = 0;
            if ( CURRENTIMG != "" ) {  
                if (CURRENTCAPTION != "") { 
                    innerContent += "<img alt='lifeStage' src='"+ CURRENTIMG +"' loading='lazy'><figcaption>"+ CURRENTCAPTION +"</figcaption></figure>"; 
                } else {
                    innerContent += "<img alt='lifeStage' src='"+ CURRENTIMG +"' loading='lazy'></figure>";
                }
            } 
            else {
                if (CURRENTCAPTION != "") { 
                    innerContent += "<img alt='lifeStage' src='https://images.unsplash.com/photo-1454425064867-5ba516caf601?w=1000&h=1000&fit=crop&crop=focalpoint&fp-z=1.4&fp-x=0.45&fp-y=0.42' loading='lazy'><figcaption>"+ CURRENTCAPTION +"</figcaption></figure>"; 
                } else {
                    innerContent += "<img alt='lifeStage' src='https://images.unsplash.com/photo-1454425064867-5ba516caf601?w=1000&h=1000&fit=crop&crop=focalpoint&fp-z=1.4&fp-x=0.45&fp-y=0.42' loading='lazy'></figure>";
                }
                currentLifestageImgCounter++;
            } 
            if(currentLifestageImgCounter < 1) { 
                if(shroom[4].showTitles == true) {
                    if (CURRENTDESC != "") { innerContent += "<h3>" + CURRENTH3 + "</h3><p>"+ CURRENTDESC +"</p>"; } 
                    else { innerContent += "<h3>" + CURRENTH3 + "</h3>" }
                } else {
                    if (CURRENTDESC != "") { innerContent += "<p>"+ CURRENTDESC +"</p>"; } 
                }
                lifestagesContent += ("<label class='click-zoom'><figure><input type='checkbox'>" + innerContent + "</label>"); 
            }
        }
        if (lifestagesContent == "") { $("#lifestages-images").css({"display":"none"}); lifeStagesCounter++; }
        $("#lifestages-images").html(lifestagesContent);
        
        if (lifeStagesCounter == 3) { $("#lifeStages").css({"display":"none"}); }
        
        /* Significance */
        let significanceCounter = 0;
        let scientificCounter = 0;
        $("#significance-scientific").html(shroom[5].scientific.scientific);
        if (shroom[5].scientific.scientific == "") { $("#significance-scientific-container").css({"display":"none"}); scientificCounter++; }
        $("#significance-environmental").html(shroom[5].scientific.environmental);
        if (shroom[5].scientific.environmental == "") { $("#significance-environmental-container").css({"display":"none"}); scientificCounter++; }
        $("#significance-gene").html(shroom[5].scientific.genetic);
        if (shroom[5].scientific.genetic == "") { $("#significance-gene-container").css({"display":"none"}); scientificCounter++; }
        if (scientificCounter == 3) {
            $("#scientific-container").css({"display":"none"});
            significanceCounter++;
        }

        let culturalCounter = 0;
        $("#significance-cultural").html(shroom[5].cultural.cultural);
        if (shroom[5].cultural.cultural == "") { $("#significance-cultural-container").css({"display":"none"}); culturalCounter++; }
        $("#significance-medicinal").html(shroom[5].cultural.medicinal);
        if (shroom[5].cultural.medicinal == "") { $("#significance-medicinal-container").css({"display":"none"}); culturalCounter++; }
        $("#significance-facts").html(shroom[5].cultural.funfacts);
        if (shroom[5].cultural.funfacts == "") { $("#significance-facts-container").css({"display":"none"}); culturalCounter++; }
        if (culturalCounter == 3) {
            $("#cultural-container").css({"display":"none"});
            significanceCounter++;
        }

        let cullinaryCounter = 0;
        $("#significance-cullinary").html(shroom[5].cullinary.cullinary);
        if (shroom[5].cullinary.cullinary == "") { $("#significance-cullinary-container").css({"display":"none"}); cullinaryCounter++; }
        $("#significance-taste").html(shroom[5].cullinary.taste);
        if (shroom[5].cullinary.taste == "") { $("#significance-taste-container").css({"display":"none"}); cullinaryCounter++; }
        arrayResponse("#significance-recipes", shroom[5].cullinary.recipelist);
        if (shroom[5].cullinary.recipelist == "") { $("#significance-recipes-container").css({"display":"none"}); cullinaryCounter++; }
        if (cullinaryCounter == 3) {
            $("#cullinary-container").css({"display":"none"});
            significanceCounter++;
        }

        if(significanceCounter == 3) { $("#significance").css({"display":"none"}); }
        
        /* Geography */
        let geographyCounter = 0;
        // $("#geography-region").html(shroom[6].region);
        $("#geography-fruitLocation").html(shroom[6].fruitlocation);
        if (shroom[6].fruitlocation == "") { $("#geography-fruitLocation").css({"display":"none"}); geographyCounter++; }
        // $("#geography-coordinates").html(shroom[6].coordinates);
        if( geographyCounter == 1 ) {
            $("#geography").css({"display":"none"});
        }
        
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

        /* Relevant Links */
        let relevantLinksCounter = 0;
        arrayResponse("#relevantlinksList", shroom[8].linkslist, "external");
        if (shroom[8].linkslist == "") { $("#relevantlinksList").css({"display":"none"}); relevantLinksCounter++; }
        if( relevantLinksCounter == 1 ) {
            $("#relevantlinks").css({"display":"none"});
        }

        /* ArrayResponse */
        function arrayResponse(tagName, arrayToList, customtag, hidden) { // hidden will be compared to array items and will have the tag "hidden"
            if ( arrayToList.length > 0 ) {
                let basetags = "";
                for (let i=0; i<arrayToList.length; i++) { 
                    let classTag = ""
                    if(customtag) { classTag = customtag; } 
                    else { classTag = arrayToList[i].toLowerCase().replaceAll(' ', '') }
                    basetags += "<li class='" + classTag + "'>" + arrayToList[i] + "</li>";
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
        $("#pullupContent #fullDescription").load(PROJECTDESC); 



/* F U N G I   D A T A B A S E   S E T U P ------------------------------------------------------- */

        const JSONURL = "./fungi/" + (FUNGIFAMILY) + "/" + (FUNGIID) + ".json";
        preloadPullup(JSONURL);
        setPullup();
        $("#pageH2Tags-container").removeClass("show");
    });

    /* Tags: For new tags, update TAGPREFIX, TAGOBJECTS, and NEWTAGOBJECTS */
    for(let i=0; i<$(".fungiGridElement").length; i++) {
        const FUNGIID = $(".fungiGridElement:nth-child("+(i+1)+")").attr("id");
        const FUNGIFAMILY = $(".fungiGridElement:nth-child("+(i+1)+")").attr("class").replace(' fungiGridElement', '');

        const JSONURL = "./fungi/" + (FUNGIFAMILY) + "/" + (FUNGIID) + ".json";
        $.getJSON(JSONURL, function(json) { 
            let shroom = Object.values(json);
            let fungiID = shroom[1].genus.toLowerCase()+"-"+shroom[1].species.toLowerCase();

            if (shroom[2].coverimg != "") { /* Override display image */
                let newCoverImg = "#distinguishing-coverimg-" + shroom[1].genus.toLowerCase() + "-" + shroom[1].species.toLowerCase();
                $(newCoverImg).attr("src", shroom[2].coverimg);
                console.log(newCoverImg)
            }
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
                if(matchTag.indexOf(tagTest) >= 0) {  $(trackedFungus).removeClass("hidden"); } 
                else { $(trackedFungus).addClass("hidden"); }
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

                if((currentSpecimenTags.indexOf(currentlySelectedTagsSimplified) >= 0)) { specimenTagCounter += 0; } 
                else if (currentlySelectedTagsSimplified == "all") { /* Do Nothing */ } 
                else { specimenTagCounter+= 1; }
            }
            specimenTagTracker.push(specimenTagCounter);
        }

        for(let i=0; i < $(".fungiGridElement").length; i++) {
            if(specimenTagTracker[i] > 0){ $(".fungiGridElement:nth-child("+(i+1)+")").addClass("hiddenTag"); } 
            else { $(".fungiGridElement:nth-child("+(i+1)+")").removeClass("hiddenTag"); }
        }
    }



/* O P E N   P O P U P  -------------------------------------------------------------------------- */

    const PAGENAMES = [
        "definitions", 
        "about",
        "communities",
        "forage",
        "grow",
        "cullinary",
        "learn"
    ];
    const PAGEHEROES = [
        "https://images.unsplash.com/photo-1583723708278-6fb1bd59d89b?w=2000",
        "./images/about/banner-about.jpg",
        "https://images.unsplash.com/photo-1550824730-05ededc35e7a?w=2000&h=800&fit=crop&fp-y=0",
        "https://images.unsplash.com/photo-1501169527804-c216a681aab8?w=2000",
        "https://images.unsplash.com/photo-1615382596404-fbce9f0fdd6a?w=2000",
        "https://images.unsplash.com/photo-1472024600210-31360ee97719?w=2000",
        "https://images.unsplash.com/photo-1592321912449-636fc434fed1?w=2000"
    ];
    const PAGETITLES = [
        "Definitions to Know",
        "About Shroombase",
        "Communities",
        "Foraging",
        "Growing",
        "Cullinary",
        "Learning"
    ];
    const PAGESUBTITLES = ["", "", "", "", "", "", ""]

    swapPages();
    function swapPages() {
        for(let i=0; i < PAGENAMES.length; i++) {
            const PAGEID = "#" + PAGENAMES[i];
            const PAGEHTML = "pages/" + PAGENAMES[i] + ".html";
            const PAGEHERO = "url(" + PAGEHEROES[i] + ")";
            $(PAGEID).click(function() { 
                $("#pullupContent #fullDescription").load(PAGEHTML, function(){
                    updateH2Tags(PAGENAMES[i]);
                }); 
                $("#pullupContent .hero").css({ 
                    "background": PAGEHERO, 
                    "background-position":"50% 50%",
                    "background-size":"cover",
                    "background-repeat":"no-repeat" 
                });
                $("#pullupContent .hero h1").html(PAGETITLES[i]); /* Project Name Setup */
                $("#pullupContent .hero p").html(PAGESUBTITLES[i]);                
                setPullup(); /* Project Content Setup */
            });
        }
    }

    function setPullup() {
        $("#pullupContent").addClass("show");
        $("#pullup").addClass("show", loadTrees()); 
        $("#pageH2Tags-container").removeClass("show");
        $(".mobileMenu").removeClass("expanded");
    }

    $("#pullupToggle").click(function() { hidePullup() });
    $("#logo").click(function() { hidePullup() });
    function hidePullup(){ 
        $("#pullup").removeClass("show"); 
        $("#pullup").animate({ scrollTop: 0 }, 100);
        $(".mobileMenu").removeClass("expanded");
    }


    
/* N A V   S U B P A G E   H 2   T A G S --------------------------------------------------------- */

    function updateH2Tags(pagename){
        $("#pageH2Tags").empty();
        let tags = [];
        let renderedtags = "";
        let H2ID = [];
        $("#pullupContent #fullDescription h2").each(function(){
            let H2TEXT = $(this).text();
            H2ID.push( H2TEXT.replace(/ /g,'') );
            $(this).attr("id", H2TEXT.replace(/ /g,'')); //Add ID to H2s
            tags.push($(this).text());
        })
        for(i=0; i<tags.length; i++){ renderedtags +="<li><a href='#"+H2ID[i]+"'>"+tags[i]+"</a></li>"; }
        if((tags.length == 0) || (pagename == "about")) { $("#pageH2Tags-container").removeClass("show"); } 
        else { $("#pageH2Tags-container").addClass("show"); }
        $("#pageH2Tags").append(renderedtags);
    }



/* T O G G L E   A D V A N C E D   S E A R C H --------------------------------------------------- */

    $("#searchAdvancedToggle").click(function() { $("#searchAdvanced").toggleClass("showAdvanced"); });

    

/* T R E E S    C A R D S ------------------------------------------------------------------------ */

    function loadTrees() {
        const JSONURL = "../trees/trees.json";
        $.getJSON(JSONURL, function(json) { 
            let tree = Object.values(json);
            let treetypes = ["beech", "birch", "cedar", "fir", "maple", "oak", "pine", "spruce", "placeholder"];

            for (let i=0; i<treetypes.length-1; i++) { // length-1 due to placeholder
                let treeClassTag = "." + treetypes[i];
                addTreeTags(tree[i].name);
                $(treeClassTag).addClass("hovercardTag");
                $(treeClassTag).click( function() { $(treeClassTag).toggleClass("clicked"); });
                $(document).click(function(event) { 
                    var $target = $(event.target);
                    if(!$target.closest(treeClassTag).length && 
                    $(treeClassTag).is(":visible")) {
                      $(treeClassTag).removeClass("clicked");
                    }        
                });
            }

            function addTreeTags(treeName) {
                let treeName_updated = treeName.toLowerCase().replace(' ', '');
                let treeClassTag = "." + treeName_updated;

                const TREEINDEX = jQuery.inArray( treeName_updated, treetypes );
                $(treeClassTag).html(
                    "<span>" + treeName + "</span>\
                    <div class='" + treeName_updated + "_container hovercard'>\
                        <h3>" + tree[TREEINDEX].name + "</h3>\
                        <p class='figcaption'>" + tree[TREEINDEX].scientificName + "</p>\
                        <p>" + tree[TREEINDEX].description + "</p>\
                        <div>\
                            <figure class='treeFigure'>\
                                <img class='treeImg' alt='" + treeClassTag + " tree' src='" + tree[TREEINDEX].tree_image + "' loading='lazy'>\
                                <figcaption class='treeCaption figcaption'>" + tree[TREEINDEX].tree_imageCaption + "</figcaption>\
                                <h3>Tree</h3>\
                            </figure>\
                            <figure class='woodFigure'>\
                                <img class='woodImg' alt='" + treeClassTag + " wood' src='" + tree[TREEINDEX].wood_image + "' loading='lazy'>\
                                <figcaption class='woodCaption figcaption'>" + tree[TREEINDEX].wood_imageCaption + "</figcaption>\
                                <h3>Wood</h3>\
                            </figure>\
                            <figure class='leafFigure'>\
                                <img class='leafImg' alt='" + treeClassTag + " leaf' src='" + tree[TREEINDEX].leaf_image + "' loading='lazy'>\
                                <figcaption class='leafCaption figcaption'>" + tree[TREEINDEX].leaf_imageCaption + "</figcaption>\
                                <h3>Leaf</h3>\
                            </figure>\
                            <figure class='flowerFigure'>\
                                <img class='flowerImg' alt='" + treeClassTag + " flower' src='" + tree[TREEINDEX].flower_image + "' loading='lazy'>\
                                <figcaption class='flowerCaption figcaption'>" + tree[TREEINDEX].flower_imageCaption + "</figcaption>\
                                <h3>Flower</h3>\
                            </figure>\
                            <figure class='fruitSeedFigure'>\
                                <img class='fruitSeedImg' alt='" + treeClassTag + " fruit, cone, or seed' src='" + tree[TREEINDEX].fruitSeed_image + "' loading='lazy'>\
                                <figcaption class='fruitSeedCaption figcaption'>" + tree[TREEINDEX].fruitSeed_imageCaption + "</figcaption>\
                                <h3>Fruit or Seed</h3>\
                            </figure>\
                            <figure class='otherFigure'>\
                                <img class='otherImg' alt='" + treeClassTag + " other distinguishing characteristic' src='" + tree[TREEINDEX].other_image + "' loading='lazy'>\
                                <figcaption class='otherCaption figcaption'>" + tree[TREEINDEX].other_imageCaption + "</figcaption>\
                                <h3>Other Features</h3>\
                            </figure>\
                        </div>\
                    </div>"
                );

                let treeFields = ["tree", "wood", "leaf", "flower", "fruitSeed", "other"];
                let treeJSONFields = [];
                let numFiguresCounter = 0;
                for (let j=0; j<treeFields.length; j++) {
                    let treeFieldsToJSON = treeFields[j] + "_image";
                    treeJSONFields.push(treeFieldsToJSON);

                    if((tree[TREEINDEX][treeJSONFields[j]] == '')) {
                        const CURRENTTREEFIGURECLASS = treeClassTag + " ." + treeFields[j] + 'Figure';
                        $(CURRENTTREEFIGURECLASS).css({"display":"none"});
                        numFiguresCounter++;
                    }
                }
                if(numFiguresCounter >= 5) { $(treeClassTag).addClass("small"); }
                if(numFiguresCounter == 6) { $(treeClassTag).addClass("noFigures"); }

                if((numFiguresCounter % 2) == 0) { $(treeClassTag).addClass("even"); } //EVEN
            }
        });
    }
})

