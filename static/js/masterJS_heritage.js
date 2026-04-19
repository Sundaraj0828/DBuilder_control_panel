function draw(){
    console.log('draw heritage');

    var canvas = document.getElementById("door");
    var ctx =canvas.getContext("2d");

    // ===========================================================

    var selectedPanel = '';
    var selectedColor = '';

    var w_ft = 0;
    var h_ft = 0.0;

    var darker1 = '';
    var darker2 = '';
    var darker3 = '';
    
    var lighter1 = '';
    var lighter2 = '';
    var lighter3 = '';

    var width_options = [];

    var section_heights = [];
    var rail_heights = [];

    var panel_width = {};
    var panel_height = 0.0;
    var beveled_edge = 0.0;

    var base_color = '';

    var width_height_px = [];

    // ============================================================

    width_options = [800, 900, 1000];

    w_ft = document.getElementById("door_w").value;  //----ft
    h_ft = document.getElementById("door_h").value;  //----ft

    if(w_ft && h_ft){
        selectedPanel = document.getElementById('panels').value;
        selectedColor = document.getElementById('colors').value;
        selectedGlassType = document.getElementById('glassType').value;
        selectedWindow = document.getElementById('window').value;
        windowRow = document.getElementById('win_row').value;
    }
    else{
        alert('select width n height first');
    }
    
    section_heights = [18, 21, 24];
    rail_heights = [2.250, 3.750, 3.875, 1.875];

    panel_width = {
        sp_width = 21.000,
        lp_width = 41.000
    };

    base_color = selectedColor;


    // ===================================================================

    // -------------get width height in px
    function get_width_height_in_px(w_ft, h_ft, width_options){
        var door_size = {}
        var door_width = 0
        var door_height = 0
        if(w_ft>=8 && w_ft<=9){    
            door_width = width_options[0]
            door_height = door_width*(h_ft/w_ft)+4
        }
        else if(w_ft>=10 && w_ft <= 16){   
            door_width = width_options[1]
            door_height = door_width*(h_ft/w_ft)+4
        }
        else if(w_ft>=17 && w_ft<=20){ 
            door_width = width_options[2]
            door_height = door_width*(h_ft/w_ft)+4
        }

        if(door_width && door_height){
            door_size[w] = door_width
            door_size[h] = door_height
        }
        
        return door_size
    }


    // -------------create base door
    function door_area(d_width, d_height, b_color, selectedPanel){
        ctx.fillStyle = b_color; 
        ctx.fillRect(0, 0, d_width, d_height-4);   
        ctx.fill(); 

    }

    // ===================================================================

    width_height_px = get_width_height_in_px(w_ft, h_ft, width_options);
    console.log(width_height_px)

    // ==================================================================

    if(width_height_px.length == 2){
        canvas.width = width_height_px[w];
        canvas.height = width_height_px[h];

        door_area(canvas.width, canvas.height, base_color, selectedPanel);
    }

}