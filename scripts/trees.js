// $("#treeCards p").hover(function() {
//     alert( "Handler for .hover() called." );
// });

loadTrees();
function loadTrees() {
    const JSONURL = "../trees/trees.json";
    $.getJSON(JSONURL, function(json) { 
        let tree = Object.values(json);
        console.log( tree );
    });
}
