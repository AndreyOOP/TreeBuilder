tree = [
    new node(1, 0, "A"),
    new node(2, 0, "B"),
    new node(3, 1, "sub 1 a"),
    new node(4, 1, "sub 2 a"),
    new node(5, 2, "sub 1 b"),
    new node(6, 2, "sub 2 b"),
    new node(7, 4, "sub 1 a_1"),
    new node(8, 4, "sub 1 a_2"),
    new node(9, 8, "x"),
    new node(10, 8, "y"),
    new node(11, 9, "z")
    ];

function node(id, parentId, name){
    this.id = id;
    this.parentId = parentId;
    this.name = name;
}

function startBuilding(){

    buildTree( getChildsOf(0));

    $(".treeClose").click(openCloseNode);
    $(".treeClick").click(onClickE);
}

function buildTree(nodes){

    var currNode;
    var childs;
    var addLine;

    while(nodes.length > 0){
        
        currNode = nodes.pop();
        childs = getChildsOf( currNode.id);

        if(childs.length == 0){
            
            if( $("#{0}>ul".format(currNode.parentId)).length>0){

                $("#"+currNode.parentId+">ul").append( toHtmlBottomNode(currNode));
            }else{

                $("#"+currNode.parentId).append( "<ul>" + toHtmlBottomNode(currNode) + "</ul>");
            }
        }else{
            
            if( $("#{0}>ul".format(currNode.parentId)).length>0){

                $("#"+currNode.parentId+">ul").append( toHtmlMidNode(currNode));
            }else{

                $("#"+currNode.parentId).append( "<ul>" + toHtmlMidNode(currNode) + "</ul>");
            }

            // $("#"+currNode.parentId).append( toHtmlMidNode(currNode));
            
            buildTree(childs);
        }
    }
}

function toHtmlMidNode(node){

    return "<li class='treeClose' id='{0}' parentId='{1}'><span>{2}</span></li>".format(node.id, node.parentId, node.name);
}

function toHtmlBottomNode(node){

    return "<li class='treeClick' id='{0}' parentId='{1}'><span>{2}</span></li>".format(node.id, node.parentId, node.name);
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

function initialization(){

    $(document).ready( function(){
        
        $(".treeClose").click(openCloseNode);
        $(".treeClick").click(onClickE);
    });
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

initialization();