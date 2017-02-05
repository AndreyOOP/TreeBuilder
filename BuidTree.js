tree = [
    new node(1, 0, "CATEGORY A"),
    new node(2, 0, "CATEGORY B"),
    new node(3, 1, "category a 1"),
    new node(4, 1, "category a 2"),
    new node(5, 2, "category b 1"),
    new node(6, 2, "category b 2"),
    new node(7, 2, "category b 3"),
    new node(8, 11, "category c 1"),
    new node(9, 11, "category c 2"),
    new node(10, 13, "category d 1"),
    new node(11, 0, "CATEGORY C"),
    new node(12, 13, "category d 2"),
    new node(13, 0, "CATEGORY D"),
    new node(14, 3, "sub 1"),
    new node(15, 3, "sub 2"),
    new node(16, 3, "sub 3"),
    new node(17, 4, "sub 1"),
    new node(18, 4, "sub 2"),
    new node(19, 4, "sub 3"),
    new node(20, 8, "sub 1"),
    new node(21, 8, "sub 2"),
    new node(22, 8, "sub 3"),
    new node(23, 8, "sub 4"),
    new node(24, 9, "sub 1"),
    new node(25, 9, "sub 2"),
    new node(26, 10, "sub 1"),
    new node(27, 10, "sub 2"),
    new node(28, 12, "sub 1"),
    new node(29, 12, "sub 2"),
    new node(30, 5, "sub 1"),
    new node(31, 6, "sub 1"),
    new node(32, 7, "sub 1")
    ];

function node(id, parentId, name){
    this.id = id;
    this.parentId = parentId;
    this.name = name;
}

function startBuilding(){

    addCSS();

    buildTree( getChildsOf(0));

    ch = getLevel2();
    for(var i=0; i<ch.length; i++){
        
        var pid = ch[i].id;
        $("#"+pid+">ul").append( addNewCategory());
    }

    $(".treeClick").css({"color": "green"});
    $(".treeNewCat").css({"color": "red"});
    
    $(".treeClose").click(openCloseNode);
    $(".treeClick").click(onClickE);
    $(".treeNewCat").click(newCat);
}

function buildTree(nodes){

    for(var i=0; i<nodes.length; i++){    
        
        currNode = nodes[i];
        parentId = nodes[i].parentId;
        childs   = getChildsOf( currNode.id);

        addUlToLiNode(parentId);

        ulNode = $("#" + parentId + ">ul");
        
        if(childs.length > 0){
            
            ulNode.append( addMidNode(currNode));
            
            buildTree(childs);
        }else{

            ulNode.append( addBottomNode(currNode));
        }
    }
}

function addUlToLiNode(parentId){

    var liNode = $("#"+parentId);
        
    if(liNode.has("ul").length == 0){
        liNode.append("<ul></ul>");
    }
}

function addNewCategory(){

    return "<li class='treeNewCat'><span>New Category</span></li>";
}

function addMidNode(node){

    return "<li class='treeClose' id='{0}' parentId='{1}'><span>{2}</span></li>".format(node.id, node.parentId, node.name);
}

function addBottomNode(node){

    return "<li class='treeClick' id='{0}' parentId='{1}'><span>{2}</span></li>".format(node.id, node.parentId, node.name);
}

function getLevel2(){

    var level2 = [];
    var top = getChildsOf(0);
    
    for(var i=0; i<top.length; i++){
        level2 = level2.concat(getChildsOf(top[i].id));
    }

    return level2;
}

function getChildsOf(parent){

    var childs = [];

    for(var i=0; i<tree.length; i++){
        if(tree[i].parentId == parent){
            childs.push(tree[i]);
        }
    }

    return childs;
}

function openCloseNode(e){

    e.stopPropagation();
    
    $(this).children().find("li").toggle();
}

function onClickE(e){

    e.stopPropagation();

    var out = $(this).text() + "->";
    var id  = $(this).attr("parentId");
    var t   = $("#"+id+">span").first();

    while(t.length>0){
        
        out += t.text() + "->";
        id   = $("#"+id).first().attr("parentId");
        t    = $("#"+id+">span").first();
    }

    alert(out);

}

function newCat(e){
    e.stopPropagation();
    alert("Add new Category");
}

function addCSS(){

    var css = "<link rel='stylesheet' type='text/css' href='treeStyle.css'>";

    $("head").append(css);
}

String.prototype.format = function() {
  
    var formatted = this;
  
    for( var arg in arguments ) {
        formatted = formatted.replace("{" + arg + "}", arguments[arg]);
    }
  
    return formatted;
};