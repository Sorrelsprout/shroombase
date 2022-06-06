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


    // Fungi Database Setup ------------------------------------------------------------------------

    // Setup databases
    // Load each element
    let tags_edibility, tags_treelationship = "";
    
    let nomenclature_division, nomenclature_class, nomenclature_order, nomenclature_family, nomenclature_genus, nomenclature_species, nomenclature_variation, nomenclature_aliases = "";

    let distinguishing_abundancy, distinguishing_smell, distinguishing_tidbits = [];

    let characteristics_cap_img, characteristics_underside_img, characteristics_side_img, characteristics_halved_img, characteristics_stem_img, characteristics_sporeprint_img, characteristics_bruising_img, characteristics_koh_img, characteristics_latex_img, characteristics_bioluminescence_img = "";
    let characteristics_cap_caption, characteristics_underside_caption, characteristics_side_caption, characteristics_halved_caption, characteristics_stem_caption, characteristics_sporeprint_caption, characteristics_bruising_caption, characteristics_koh_caption, characteristics_latex_caption, characteristics_bioluminescence_caption = "";
    let characteristics_cap_desc, characteristics_underside_desc, characteristics_side_desc, characteristics_halved_desc, characteristics_stem_desc, characteristics_sporeprint_desc, characteristics_bruising_desc, characteristics_koh_desc, characteristics_latex_desc, characteristics_bioluminescence_desc = "";

    let lifestages_fruitseason = "";
    let lifestages_fruiting_img,lifestages_egg_img,lifestages_eruption_img,lifestages_button_img,lifestages_mature_img,lifestages_old_img = "";
    let lifestages_fruiting_caption,lifestages_egg_caption,lifestages_eruption_caption,lifestages_button_caption,lifestages_mature_caption,lifestages_old_caption = "";
    let lifestages_fruiting_desc,lifestages_egg_desc,lifestages_eruption_desc,lifestages_button_desc,lifestages_mature_desc,lifestages_old_desc = "";

    let significance_scientific, significance_scientific_environmental, significance_scientific_genetic = "";
    let significance_cultural, significance_cultural_medicinal, significancecultural_funfacts = "";
    let significance_cullinary, significance_cullinary_taste, significance_cullinary_recipelist = "";

    let geography_fruitlocation = "";
    let geography_coordinates = [];

    let lookalikes_names, lookalikes_images, lookalikes_descs = [];



    // Hero Fix ----------------------------------------------------------------------
    let conHeight = $("#pullup .hero").height();
    let imgHeight = $("#pullup .hero img").height();
    let gap = (imgHeight - conHeight) / 2;
    $("#pullup .hero img").css("top", -gap);



    // Pullup ------------------------------------------------------------------------
    $("#fungiGrid > div").click(function() { 
        /* Get Project ID */
        const PROJECTINDEX = $(this).index();
        const FUNGIID = $("#fungiGrid > div:nth-child("+(PROJECTINDEX+1)+")").attr("id");
        const FUNGIFAMILY = $("#fungiGrid > div:nth-child("+(PROJECTINDEX+1)+")").attr("class");

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
        const PROJECTDESC = "pages/template.html";
        $("#pullupContent .fullDescription").load(PROJECTDESC); 
        setPullup();

        // Fungi Database Setup ------------------------------------------------------------------------
        // const PROJECTDESC = "pages/" + (FUNGIFAMILY) + "/" + (FUNGIID) + ".html";
        const JSONURL = "pages/" + (FUNGIFAMILY) + "/" + (FUNGIID) + ".json";
        $.getJSON(JSONURL, function(json) { 
            let shroom = Object.values(json);
            
            /* Tags */
            $("#tags-poisonousEdible").html(shroom[0].edibility);
            
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
            $("#geography-fruitLocation").html(shroom[6].fruitloaction);
            // $("#geography-coordinates").html(shroom[6].coordinates);
            
            /* Lookalikes */
            $("#characteristicsGrid").html(
                // Load each item
                // shroom[7].names
                // shroom[7].images
                // shroom[7].desc
            );
        });
    });

    $("#about").click(function() { 
        $("#pullupContent .fullDescription").load("pages/about.html"); 
        $("#pullupContent .hero").css({ 
            "background": "url(images/about/banner-about.jpg)", 
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
    $("#nav-home").click(function() { hidePullup() });
    $("#logo").click(function() { hidePullup() });
    function hidePullup(){
        $("#pullup").removeClass("show");
    }
})
