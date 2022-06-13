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



    // Hero Fix ----------------------------------------------------------------------
    let conHeight = $("#pullup .hero").height();
    let imgHeight = $("#pullup .hero img").height();
    let gap = (imgHeight - conHeight) / 2;
    $("#pullup .hero img").css("top", -gap);


    // Setup Fungi Grid  -------------------------------------------------------------
    
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
   

    // Pullup ------------------------------------------------------------------------
    $("#fungiGrid > div").click(function() { 
        /* Get Project ID */
        const PROJECTINDEX = $(this).index();
        const FUNGIID = $("#fungiGrid > div:nth-child("+(PROJECTINDEX+1)+")").attr("id");
        const FUNGIFAMILY = $("#fungiGrid > div:nth-child("+(PROJECTINDEX+1)+")").attr("class").replace(' fungiGridElement', '');

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

        // Fungi Database Setup ------------------------------------------------------------------------
        // const PROJECTDESC = "fungi/" + (FUNGIFAMILY) + "/" + (FUNGIID) + ".html";
        const JSONURL = "./fungi/" + (FUNGIFAMILY) + "/" + (FUNGIID) + ".json";
        $.getJSON(JSONURL, function(json) { 
            let shroom = Object.values(json);
            
            /* Tags */
            $("#tags-poisonousEdible").html(shroom[0].edibility);
            $("#tags-poisonousEdible").removeClass().addClass(shroom[0].edibility);
            if (shroom[0].edibility == "") { $("#tags-poisonousEdible").css({"display":"none"}) }

            $("#tags-treeRelation").html(shroom[0].treelationship);
            if ( shroom[0].treelationship.length > 0 ) {
                let basetags = "";
                for (let i=0; i<shroom[0].treelationship.length; i++) { 
                    basetags += "<li>" + shroom[0].treelationship[i] + "</li>";
                }
                $("#tags-treeRelation").html(basetags); 
            } else {
                $("#tags-treeRelation").css({"display":"none"});
            }

            $("#tags-type").html(shroom[0].type);
            $("#tags-type").removeClass().addClass(shroom[0].type);
            if (shroom[0].type == "") { $("#tags-type").css({"display":"none"}) }
            
            /* Division */
            $("#nomenclature-division").html(shroom[1].division);
            $("#nomenclature-class").html(shroom[1].class);
            $("#nomenclature-order").html(shroom[1].order);
            $("#nomenclature-family").html(shroom[1].family);
            $("#nomenclature-genus").html(shroom[1].genus);
            $("#nomenclature-species").html(shroom[1].species);
            $("#nomenclature-variety").html(shroom[1].variation);
            $("#nomenclature-aliases").html(shroom[1].aliases);
            // $("#nomenclature-displayalias").html(shroom[1].displayalias);
            
            /* Distinguishing Features */
            // $("#distinguishing-coverimg").attr("src", shroom[2].coverimg);
            $("#distinguishing-abundancy").html(shroom[2].abundancy);
            $("#distinguishing-smell").html(shroom[2].smell);
            $("#distinguishing-tidbits").html(shroom[2].tidbits);
            
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
            $("#lifestages-fruitseason").html(shroom[4].fruitseason);
            let lifestages_img = [ shroom[4].images.fruiting.img, shroom[4].images.egg.img, shroom[4].images.eruption.img, shroom[4].images.button.img, shroom[4].images.mature.img, shroom[4].images.old.img ]
            let lifestages_desc = [ shroom[4].images.fruiting.desc, shroom[4].images.egg.desc, shroom[4].images.eruption.desc, shroom[4].images.button.desc, shroom[4].images.mature.desc, shroom[4].images.old.desc ]
            let lifestagesContent = "";
            for (let i=0; i<lifestages_img.length; i++) {
                const CURRENTIMG = lifestages_img[i];
                const CURRENTDESC = lifestages_desc[i];
                let currentlifestagesContent = "";
                if ( CURRENTIMG != "" ) {
                    if (CURRENTDESC != "") {
                        currentlifestagesContent = "<figure><img alt='lifeStage' src='"+ CURRENTIMG +"' loading='lazy'><figcaption>"+ CURRENTDESC +"</figcaption></figure>";
                    } else {
                        currentlifestagesContent = "<figure><img alt='lifeStage' src='"+ CURRENTIMG +"' loading='lazy'></figure>";
                    }
                } else {
                    if (lifestages_desc[i] != "") {
                        currentlifestagesContent = "<figure><img alt='lifeStage' src='https://images.unsplash.com/photo-1454425064867-5ba516caf601?w=1000&h=1000&fit=crop&crop=focalpoint&fp-z=1.4&fp-x=0.45&fp-y=0.42' loading='lazy'><figcaption>Placeholder image. "+ CURRENTDESC +"</figcaption></figure>";
                    } else { currentlifestagesContent = ""; }
                } lifestagesContent += currentlifestagesContent;
            }
            if (lifestagesContent == "") { lifestagesContent = "<p>No Lifecycle Images</p>"; }
            $("#lifestages-images").html(lifestagesContent);
            
            /* Significance */
            $("#significance-scientific").html(shroom[5].scientific.scientific);
            $("#significance-environmental").html(shroom[5].scientific.environmental);
            $("#significance-genetic").html(shroom[5].scientific.genetic);

            $("#significance-cultural").html(shroom[5].cultural.cultural);
            $("#significance-medicinal").html(shroom[5].cultural.medicinal);
            $("#significance-facts").html(shroom[5].cultural.facts);

            $("#significance-cullinary").html(shroom[5].cullinary.cullinary);
            $("#significance-taste").html(shroom[5].cullinary.taste);
            $("#significance-recipes").html(shroom[5].cullinary.recipelist);
            
            /* Geography */
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
        });
        setPullup();
    });


    
    // Search ------------------------------------------------------------------------
    $("#badsearch").addClass("hidden");
    let searchBarString = "";
    let searchTagsStringSet = "";
    let completeSearchString = "";
    
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
        modCompleteSearchString();
    });
    
    let searchDropdownsIDs = ["#searchEdibility", "#searchTree", "#searchColor", "#searchGeo", "#searchSeason"];
    let searchDropdowns = ["", "", "", "", ""];
    for (let i=0; i<searchDropdownsIDs.length; i++) {
        $(searchDropdownsIDs[i]).change(function() {
            searchDropdowns[i] = $("#searchAdvanced .inputSelect:nth-child(" + (i+1) + ") option:selected").val()
            searchTagsStringSet = searchDropdowns.join();
            modCompleteSearchString();
        });
    }


    // Example: modCompleteSearchString( "oak", 1, "poisonousoak")
    function modCompleteSearchString(){
        completeSearchString = searchBarString.toLowerCase() + "," + searchTagsStringSet.toLowerCase();

        if(completeSearchString.includes("")){
            //
        } else {
            //
        }
        console.log(completeSearchString)
    }

    // Open Popup --------------------------------------------------------------------
    $("#terms").click(function() { 
        $("#pullupContent .fullDescription").load("pages/terms.html"); 
        $("#pullupContent .hero").css({ 
            "background": "url(./images/about/banner-about.jpg)", 
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
    }
})
