function draw(){  
    console.time('draw');

    console.log('-- Full View --');

    var starttime = performance.now();

    var canvas = document.getElementById("door");
    var ctx =canvas.getContext("2d"); 


    // =========================================================================

    var w_ft = document.getElementById("door_w").value;  //----ft
    var h_ft = document.getElementById("door_h").value;  //----ft

    var selectedColor = '';

    if(w_ft && h_ft){
        selectedColor = document.getElementById('colors').value;
    }
    else{
        alert('select width and height first');
    }

    var selectedPanel = document.getElementById("panels").value;

    var selectedGlassType = document.getElementById('glassType').value; 


    // =========================================================================



    

    var width_options = [800, 900, 1000];

    var section_heights = [18, 21, 24, 28];  // ----inch

    var s_height_list = [];

    var s_height_count = [3, 4, 5, 6, 7];

    var panel_height = [];

    if(selectedPanel == 'Vista'){
        panel_height = [15.25, 17.25, 18.25, 20.25, 12.25, 14.25];    
    }
    else if(selectedPanel == 'Single Pane Glass' || selectedPanel == 'Insulated Glass'){
        panel_height = [
                    8.063, 
                    10.063, 
                    8.25, 
                    9.75, 
                    8.344, 
                    9.531, 
                    8.406, 
                    9.406, 
                    8.469, 
                    8.563, 
                    9.063, 
                    9.563,
                    7.125, 
                    7.5,
                    7.875,
                    6.25,
                    6.531,
                    6.844,
                    7.438,
                    7.75,
                    8.031,
                    8.625,
                    8.938,
                    9.25,
                    7.656,
                    7.906,
                    8.156
                ];
    }

    const top_btm_rail_tn = 3.875;

    const int_top_btm_rail_tn = 1.875;

    const center_rail_tn = 2.750;

    var door_size = []

    var base_color = '';

    var color_shades = [];

    var lighter_shades = [];

    var darker_shades = [];

    var rail_heights = {};

    var p_endStile_spacing = 0.0;    

    if(w_ft == 17 || w_ft == 20 || w_ft == 18 || w_ft == 19){
        p_endStile_spacing = 6.375;
    }
    else{
        p_endStile_spacing = 3.375;
    }

    const p_centerStile_spacing = 2.750;

    var panel_count = 0;

    var panel_width = [];

    if(selectedPanel == 'Vista'){
        panel_width = {
            8 : [43.25],
            9 : [49.25],
            10 : [35.25, 37.25],
            12 : [43.25, 45.25],
            13 : [31.25, 39.25],
            14 : [37.25, 39.25],
            15 : [43.25, 39.25],
            16 : [43.25, 45.25],
            17 : [31.25, 39.25],
            18 : [35.75, 40.25],
            20 : [32.25, 37.25]
        };
    }
    if(selectedPanel == 'Insulated Glass'){
        panel_width = {
            8 : [43.25],
            9 : [49.25],
            10 : [35.25, 37.25],
            12 : [43.25, 45.25],
            13 : [31.25, 39.25],
            14 : [37.25, 39.25],
            15 : [43.25, 39.25],
            16 : [43.25, 45.25],
            17 : [31.25, 39.25],
            18 : [35.75, 40.25],
            20 : [32.25, 37.25]
        };
    }
    else if(selectedPanel == 'Single Pane Glass'){ 
        panel_width = {
            8 : [89.25],
            9 : [49.25],
            10 : [55.25],
            11 : [61.25],
            12 : [67.25],
            13 : [73.25],
            14 : [79.25],
            15 : [85.25],
            16 : [91.25],
            17 : [61.917],
            18 : [65.917],
            20 : [73.917]
        };
    }

    var p_width = [];

    

    // =========================================================================

    // ------------------ Glass Type / Gradients --------------------------

    function rad_grad(x, y, w, h){

        

        if(selectedGlassType == 'clear'|| 
            selectedGlassType == 'frost' || 
            selectedGlassType == 'grey' || 
            selectedGlassType == 'bronze' ||
            selectedGlassType == 'green' || 
            selectedGlassType == 'whiteout' ||
            selectedGlassType == 'thermapro' ||
            selectedGlassType == 'snow'
            ){      
                win_grad = ctx.createLinearGradient(x, y, x + (+w), y+(+w)/2);
            }
            else if(selectedGlassType == 'dark_tint' ){
                win_grad = ctx.createLinearGradient(x, y, x + (+w), y+(+w)/2);
            } 
        
        

        if(selectedGlassType == 'dark_tint'){
            win_grad.addColorStop(0,"rgb(28, 28, 23)");
            win_grad.addColorStop(.6,"rgb(57, 57, 45)");
            win_grad.addColorStop(1,"rgb(28, 28, 23)");
        }
        else if(selectedGlassType == 'frost' ){
            win_grad.addColorStop(0,"rgb(222, 223, 218)");
            win_grad.addColorStop(.5,"rgb(255, 255, 255)");
            win_grad.addColorStop(1,"rgb(211, 211, 211)");
        }
        else if(selectedGlassType == 'clear'){
            win_grad.addColorStop(0,"rgb(128, 197, 239)");
            win_grad.addColorStop(.9,"rgb(74, 90, 127)");
        }
        else if(selectedGlassType == 'grey'){
            win_grad.addColorStop(0,"rgb(186, 188, 187)");
            win_grad.addColorStop(.5,"rgb(216, 216, 216)");
            win_grad.addColorStop(1,"rgb(186, 188, 187)");
        }
        else if(selectedGlassType == 'bronze'){
            win_grad.addColorStop(0,"rgb(40, 41, 33)");
            win_grad.addColorStop(.5,"rgb(131, 132, 126)");
            win_grad.addColorStop(1,"rgb(40, 41, 33)");
        }
        else if(selectedGlassType == 'green'){
            win_grad.addColorStop(0,"rgb(42, 45, 44)");
            win_grad.addColorStop(.5,"rgb(127, 131, 130)");
            win_grad.addColorStop(1,"rgb(42, 45, 44)");
        }

        else if(selectedGlassType == 'whiteout'){
            win_grad.addColorStop(0,"rgb(255, 255, 255)");
            win_grad.addColorStop(.5,"rgb(255, 255, 2556)");
            win_grad.addColorStop(1,"rgb(255, 255, 255)");
        }
        else if(selectedGlassType == 'snow'){
            win_grad.addColorStop(0,"rgb(208, 208, 200)");
            win_grad.addColorStop(.5,"rgb(221, 222, 216)");
            win_grad.addColorStop(1,"rgb(208, 208, 200)");
        }
        else if(selectedGlassType == 'thermapro'){
            win_grad.addColorStop(0,"rgb(210, 210, 208)");
            win_grad.addColorStop(.5,"rgb(227, 227, 225)");
            win_grad.addColorStop(1,"rgb(210, 210, 208)");
        }

        ctx.fillStyle = win_grad;
    }



    // -------- Convert width from ft to px & generate height -------------
    function convert_width_height(w_ft, h_ft){
        var door_size = []
        var door_width = 0
        var door_height = 0
        if(w_ft>=8 && w_ft<=9){    
            door_width = width_options[0]
            door_height = door_width*(h_ft/w_ft)
        }
        else if(w_ft>=10 && w_ft <= 16){   
            door_width = width_options[1]
            door_height = door_width*(h_ft/w_ft)
        }
        else if(w_ft>=17 && w_ft<=20){ 
            door_width = width_options[2]
            door_height = door_width*(h_ft/w_ft)
        }
        
        if(door_width && door_height){
            door_size = [door_width, door_height] 

            canvas.width = door_size[0]
            canvas.height = door_size[1]+4
        }


        
        return
    }

    function convert_to_ft(item){
        var item_ft = (item/12);
        return item_ft
    }

    function convert_to_px(item){
        var item_px = canvas.width*(item/w_ft);
        return item_px
    }

    function convert_sizes(item){
        var item_ft = convert_to_ft(item);
        var item_px = convert_to_px(item_ft);
        return item_px;
    }

    function get_section_heights(h){
        height_values = {};
        if(selectedPanel == 'Vista'){

            // ------------------ Section Count
            if(h == 6){                   
                height_values['s_count'] = s_height_count[0];
            } 
            else if(h==7 || h == 6.3 || h == 8 || h == 6.6 || h == 7.3 || h == 7.6 || h == 6.9 || h == 7.9){
                height_values['s_count'] = s_height_count[1];
            }
            else if(h == 8.9 || h == 9 || h == 9.3 || h == 10 || h == 8.3 || h == 8.6 || h == 9.6 || h == 9.9){
                height_values['s_count'] = s_height_count[2];
            }
            else if(h == 10.6 || h == 10.9 || h == 11 || h == 12 || h == 10.3 || h == 11.3 || h == 11.6 || h == 11.9){
                height_values['s_count'] = s_height_count[3];
            }
            else if(h == 12.3 || h == 12.6 || h == 12.9 || h == 14){
                height_values['s_count'] = s_height_count[4];
            }


            // ---------------- Section Height
            if(h == 6 || h == 8 || h == 10 || h == 12 || h == 14){       
                height_values['sh_top'] = convert_sizes(section_heights[2]);
                height_values['sh_int'] = convert_sizes(section_heights[2]);
                height_values['sh_btm'] = convert_sizes(section_heights[2]);
            }
            else if(h == 6.3){       
                height_values['sh_top'] = convert_sizes(section_heights[0]);
                height_values['sh_int'] = convert_sizes(section_heights[0]);
                height_values['sh_btm'] = convert_sizes(section_heights[1]);
            }
            else if(h == 6.6){     
                height_values['sh_top'] = convert_sizes(section_heights[1]);
                height_values['sh_int'] = convert_sizes(section_heights[0]);
                height_values['sh_btm'] = convert_sizes(section_heights[1]);
            }
            else if(h == 8.3 || h == 8.6 || h == 10.3){     
                height_values['sh_top'] = convert_sizes(section_heights[1]);
                height_values['sh_int'] = convert_sizes(section_heights[0]);
                height_values['sh_btm'] = convert_sizes(section_heights[1]);
                height_values['sh_int_2'] = convert_sizes(section_heights[1]);
            }
            else if(h == 6.9){     
                height_values['sh_top'] = convert_sizes(section_heights[1]);
                height_values['sh_int'] = convert_sizes(section_heights[0]);
                height_values['sh_btm'] = convert_sizes(section_heights[1]);
                height_values['sh_int_2'] = convert_sizes(section_heights[1]);
            }
            else if(h == 7 || h == 8.9 || h == 10.6 || h == 12.3){
                height_values['sh_top'] = convert_sizes(section_heights[1]);
                height_values['sh_int'] = convert_sizes(section_heights[1]);
                height_values['sh_btm'] = convert_sizes(section_heights[1]);
            }
            else if(h == 7.3 || h == 9 || h == 10.9 || h == 12.6){
                height_values['sh_top'] = convert_sizes(section_heights[1]);
                height_values['sh_int'] = convert_sizes(section_heights[1]);
                height_values['sh_btm'] = convert_sizes(section_heights[2]);
            }
            else if(h == 7.6 || h == 9.3 || h == 11 || h == 12.9){
                height_values['sh_top'] = convert_sizes(section_heights[2]);
                height_values['sh_int'] = convert_sizes(section_heights[1]);
                height_values['sh_btm'] = convert_sizes(section_heights[2]);
            }
            else if(h == 7.9 || h == 9.6 || h == 9.9 || h == 11.3 || h == 11.6 || h == 11.9){
                height_values['sh_top'] = convert_sizes(section_heights[2]);
                height_values['sh_int'] = convert_sizes(section_heights[1]);
                height_values['sh_btm'] = convert_sizes(section_heights[2]);
                height_values['sh_int_2'] = convert_sizes(section_heights[2]);
            }
            

            // ------------------- Panel Height
            if(h == 6 || h == 8 || h == 10 || h == 12 || h == 14){
                height_values['pHeight_top'] = convert_sizes(panel_height[2]);
                height_values['pHeight_int'] = convert_sizes(panel_height[3]);
                height_values['pHeight_btm'] = convert_sizes(panel_height[2]);
            }
            else if(h == 6.3){
                height_values['pHeight_top'] = convert_sizes(panel_height[4]);
                height_values['pHeight_int'] = convert_sizes(panel_height[5]);
                height_values['pHeight_btm'] = convert_sizes(panel_height[0]);
            }
            else if(h == 6.6){
                height_values['pHeight_top'] = convert_sizes(panel_height[0]);
                height_values['pHeight_int'] = convert_sizes(panel_height[5]);
                height_values['pHeight_btm'] = convert_sizes(panel_height[0]);
            }
            else if(h == 6.9 || h == 8.3 || h == 8.6 || h == 10.3){
                height_values['pHeight_top'] = convert_sizes(panel_height[0]);
                height_values['pHeight_int'] = convert_sizes(panel_height[5]);
                height_values['pHeight_btm'] = convert_sizes(panel_height[0]);
                height_values['pHeight_int_2'] = convert_sizes(panel_height[1]);
            }
            else if(h == 7 || h == 8.9 || h == 10.6 || h == 12.3){
                height_values['pHeight_top'] = convert_sizes(panel_height[0]);
                height_values['pHeight_int'] = convert_sizes(panel_height[1]);
                height_values['pHeight_btm'] = convert_sizes(panel_height[0]);
            }   
            else if(h == 7.3 || h == 9 || h == 10.9 || h == 12.6){
                height_values['pHeight_top'] = convert_sizes(panel_height[0]);
                height_values['pHeight_int'] = convert_sizes(panel_height[1]);
                height_values['pHeight_btm'] = convert_sizes(panel_height[2]);
            }     
            else if(h == 7.6 || h == 9.3 || h == 11 || h == 12.9){
                height_values['pHeight_top'] = convert_sizes(panel_height[2]);
                height_values['pHeight_int'] = convert_sizes(panel_height[1]);
                height_values['pHeight_btm'] = convert_sizes(panel_height[2]);
            }    
            else if(h == 7.9 || h == 9.6 || h == 9.9 || h == 11.3 || h== 11.6 || h == 11.9 ){
                height_values['pHeight_top'] = convert_sizes(panel_height[2]);
                height_values['pHeight_int'] = convert_sizes(panel_height[1]);
                height_values['pHeight_btm'] = convert_sizes(panel_height[2]);
                height_values['pHeight_int_2'] = convert_sizes(panel_height[3]);
            } 
        }
        else if(selectedPanel == 'Single Pane Glass'){
            



            if(h == 7 || h == 6 || h == 6.3 || h == 6.6 || h == 6.9){                   
                height_values['s_count'] = s_height_count[0];
            }
            else if(h == 8 || h == 9 || h == 7.3 || h == 7.6 || h == 7.9){
                height_values['s_count'] = s_height_count[1];
            }
            else if(h == 10 || h == 11 || h == 8.3 || h == 8.6 || h == 8.9 || h == 9.3 || h == 9.6 || h == 9.9 || h == 10.3 || h == 10.6 || h==10.9){
                height_values['s_count'] = s_height_count[2];
            }
            else if(h == 12 || h == 11.3 || h == 11.6 || h == 11.9){
                height_values['s_count'] = s_height_count[3];
            }
            else if(h == 14){
                height_values['s_count'] = s_height_count[4];
            }
            else{}

            // =============================================================
              
            if(h == 6){
                height_values['pHeight_top'] = convert_sizes(panel_height[0]);
            }
            else if(h == 6.3){
                height_values['pHeight_top'] = convert_sizes(panel_height[9]);
            }
            else if(h == 6.6){
                height_values['pHeight_top'] = convert_sizes(panel_height[10]);
            }
            else if(h == 6.9){
                height_values['pHeight_top'] = convert_sizes(panel_height[11]);
            }
            else if(h == 7){
                height_values['pHeight_top'] = convert_sizes(panel_height[1]);                
            } 
            else if(h == 7.3){
                height_values['pHeight_top'] = convert_sizes(panel_height[12]);                
            } 
            else if(h == 7.6){
                height_values['pHeight_top'] = convert_sizes(panel_height[13]);                
            } 
            else if(h == 7.9){
                height_values['pHeight_top'] = convert_sizes(panel_height[14]);                
            } 
            else if(h == 8){
                height_values['pHeight_top'] = convert_sizes(panel_height[2]);
            }
            else if(h == 8.3){
                height_values['pHeight_top'] = convert_sizes(panel_height[15]);
            }
            else if(h == 8.6){
                height_values['pHeight_top'] = convert_sizes(panel_height[16]);
            }
            else if(h == 8.9){
                height_values['pHeight_top'] = convert_sizes(panel_height[17]);
            }
            else if(h == 9){
                height_values['pHeight_top'] = convert_sizes(panel_height[3]);
            }
            else if(h == 9.3){
                height_values['pHeight_top'] = convert_sizes(panel_height[18]);
            }
            else if(h == 9.6){
                height_values['pHeight_top'] = convert_sizes(panel_height[19]);
            }
            else if(h == 9.9){
                height_values['pHeight_top'] = convert_sizes(panel_height[20]);
            }            
            else if(h == 10){
                height_values['pHeight_top'] = convert_sizes(panel_height[4]);
            }          
            else if(h == 10.3){
                height_values['pHeight_top'] = convert_sizes(panel_height[21]);
            }        
            else if(h == 10.6){
                height_values['pHeight_top'] = convert_sizes(panel_height[22]);
            }      
            else if(h == 10.9){
                height_values['pHeight_top'] = convert_sizes(panel_height[23]);
            }
            else if(h == 11){
                height_values['pHeight_top'] = convert_sizes(panel_height[5]);
            }
            else if(h == 11.3){
                height_values['pHeight_top'] = convert_sizes(panel_height[24]);
            }
            else if(h == 11.6){
                height_values['pHeight_top'] = convert_sizes(panel_height[25]);
            }
            else if(h == 11.9){
                height_values['pHeight_top'] = convert_sizes(panel_height[26]);
            }
            else if(h == 12){
                height_values['pHeight_top'] = convert_sizes(panel_height[6]);
            }
            else if(h == 14){
                height_values['pHeight_top'] = convert_sizes(panel_height[8]);
            }
            else{}            
        }
        else if(selectedPanel == 'Insulated Glass'){
            if(h == 7 || h == 6 || h == 6.3 || h == 6.6 || h == 6.9){                   
                height_values['s_count'] = s_height_count[0];
            }
            else if(h == 8 || h == 9 || h == 7.3 || h == 7.6 || h == 7.9){
                height_values['s_count'] = s_height_count[1];
            }
            else if(h == 10 || h == 11 || h == 8.3 || h == 8.6 || h == 8.9 || h == 9.3 || h == 9.6 || h == 9.9 || h == 10.3 || h == 10.6 || h==10.9){
                height_values['s_count'] = s_height_count[2];
            }
            else if(h == 12 || h == 11.3 || h == 11.6 || h == 11.9){
                height_values['s_count'] = s_height_count[3];
            }
            else if(h == 14){
                height_values['s_count'] = s_height_count[4];
            }
            else{}
            
            
            if(h == 6){
                height_values['pHeight_top'] = convert_sizes(panel_height[0]);
            }
            else if(h == 6.3){
                height_values['pHeight_top'] = convert_sizes(panel_height[9]);
            }
            else if(h == 6.6){
                height_values['pHeight_top'] = convert_sizes(panel_height[10]);
            }
            else if(h == 6.9){
                height_values['pHeight_top'] = convert_sizes(panel_height[11]);
            }
            else if(h == 7){
                height_values['pHeight_top'] = convert_sizes(panel_height[1]);                
            } 
            else if(h == 7.3){
                height_values['pHeight_top'] = convert_sizes(panel_height[12]);                
            } 
            else if(h == 7.6){
                height_values['pHeight_top'] = convert_sizes(panel_height[13]);                
            } 
            else if(h == 7.9){
                height_values['pHeight_top'] = convert_sizes(panel_height[14]);                
            } 
            else if(h == 8){
                height_values['pHeight_top'] = convert_sizes(panel_height[2]);
            }
            else if(h == 8.3){
                height_values['pHeight_top'] = convert_sizes(panel_height[15]);
            }
            else if(h == 8.6){
                height_values['pHeight_top'] = convert_sizes(panel_height[16]);
            }
            else if(h == 8.9){
                height_values['pHeight_top'] = convert_sizes(panel_height[17]);
            }
            else if(h == 9){
                height_values['pHeight_top'] = convert_sizes(panel_height[3]);
            }
            else if(h == 9.3){
                height_values['pHeight_top'] = convert_sizes(panel_height[18]);
            }
            else if(h == 9.6){
                height_values['pHeight_top'] = convert_sizes(panel_height[19]);
            }
            else if(h == 9.9){
                height_values['pHeight_top'] = convert_sizes(panel_height[20]);
            }            
            else if(h == 10){
                height_values['pHeight_top'] = convert_sizes(panel_height[4]);
            }          
            else if(h == 10.3){
                height_values['pHeight_top'] = convert_sizes(panel_height[21]);
            }        
            else if(h == 10.6){
                height_values['pHeight_top'] = convert_sizes(panel_height[22]);
            }      
            else if(h == 10.9){
                height_values['pHeight_top'] = convert_sizes(panel_height[23]);
            }
            else if(h == 11){
                height_values['pHeight_top'] = convert_sizes(panel_height[5]);
            }
            else if(h == 11.3){
                height_values['pHeight_top'] = convert_sizes(panel_height[24]);
            }
            else if(h == 11.6){
                height_values['pHeight_top'] = convert_sizes(panel_height[25]);
            }
            else if(h == 11.9){
                height_values['pHeight_top'] = convert_sizes(panel_height[26]);
            }
            else if(h == 12){
                height_values['pHeight_top'] = convert_sizes(panel_height[6]);
            }
            else if(h == 14){
                height_values['pHeight_top'] = convert_sizes(panel_height[8]);
            }
            else{}            
        }
        // return [sh_top, sh_int, sh_btm, s_count]
        return height_values
    }

    //  color shade generator ------
    function LightenDarkenColor(col, amt) {
        var usePound = false;
        if ( col[0] == "#" ) {
            col = col.slice(1);
            usePound = true;
        }
    
        var num = parseInt(col,16);
    
        var r = (num >> 16) + amt;
    
        if ( r > 255 ) r = 255;
        else if  (r < 0) r = 0;
    
        var b = ((num >> 8) & 0x00FF) + amt;
    
        if ( b > 255 ) b = 255;
        else if  (b < 0) b = 0;
    
        var g = (num & 0x0000FF) + amt;
    
        if ( g > 255 ) g = 255;
        else if  ( g < 0 ) g = 0;
    
        return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
    }

    function get_color_schemes(sColor){
        var l_shades = [];
        var d_shades = [];

        if(sColor){            
            base_color = sColor;
            

            for(i=1; i<=3; i++){
                var lighter1 = LightenDarkenColor(sColor, 13*i);
                l_shades.push(lighter1);
            }
            
            for(j=1; j<=3; j++){
                var inc_val = '';
                if(sColor == '#244f6f'){
                    inc_val = (-6)*j;
                }
                else{
                    inc_val = (-12)*j;
                }
                var darker1 = LightenDarkenColor(sColor, inc_val);
                d_shades.push(darker1);
            }
            
        }

        return [base_color, l_shades, d_shades]
    }


    // function get_panel_sizes(){
    //     var p_info = {};
    //     p_info['p_width'] = 

    // }

    function get_railHeights(){
        rail_thickness = {};
        rail_thickness['top_btm'] = convert_sizes(top_btm_rail_tn );
        rail_thickness['int_top_btm'] = convert_sizes(int_top_btm_rail_tn );
        rail_thickness['center'] = convert_sizes(center_rail_tn );
        return rail_thickness;
    }

    function get_panel_count(w){
        var p_count = 0;
        if(selectedPanel == 'Vista' || selectedPanel == 'Insulated Glass'){
            if(w==8 || w==9){
                p_count = 2;
            }
            else if(w==12 || w==10){
                p_count = 3;
            }
            else if(w==16 || w==15 || w==14){
                p_count = 4;
            }
            else if(w==18 || w==17){
                p_count = 5;
            }
            else if(w==20){
                p_count = 6;
            }
        }
        else if(selectedPanel == 'Single Pane Glass'){
            if(w==8){
                p_count = 1;
            }
            else if(w>=9 && w<17){
                p_count = 2;
            }
            else if(w>=17 && w<=20){
                p_count = 3;
            }
        }
        return p_count;
    }
    

    // ==========================================================================

    convert_width_height(w_ft, h_ft);

    s_height_list = get_section_heights(h_ft);

    color_shades = get_color_schemes(selectedColor);

    base_color = color_shades[0];

    lighter_shades = color_shades[1];

    darker_shades = color_shades[2];

    rail_heights = get_railHeights();

    if(panel_width[w_ft]){
        for(pw=0; pw<panel_width[w_ft].length; pw++){

            converted_width = convert_sizes(panel_width[w_ft][pw]).toFixed(3); 
            p_width.push(parseFloat(converted_width));
            console.log('p_width - ',p_width)
        }        
    }    

    panel_count = get_panel_count(w_ft);   

    

    // -----------------------------------------------------------------
    var d_width = canvas.width;
    var d_height = canvas.height-4;

    door_area(base_color, d_width, d_height);   

    bottom_line();
    
    if(selectedPanel){
        if(selectedPanel == 'Vista' ){
            section_divider(s_height_list, lighter_shades, darker_shades, rail_heights, selectedPanel);
        }
        else if(selectedPanel == 'Insulated Glass'){
            section_divider_horizon(s_height_list, lighter_shades, darker_shades, rail_heights, selectedPanel);
        }
        else if(selectedPanel == 'Single Pane Glass'){
            section_divider_horizon(s_height_list, lighter_shades, darker_shades, rail_heights, selectedPanel);
        }
    }

    

    function draw_panel(x, y, w, h, l_shades, d_shades){
        ctx.strokeStyle = 'trasnparent';
        ctx.strokeRect(x, y, w, h);
        ctx.stroke();
        

        ctx.lineWidth = 1;
        ctx.fillStyle = 'transparent';
        ctx.strokeStyle = d_shades[0];
        ctx.strokeRect(x+3, y+3, w-6, h-6);
        ctx.stroke();

        ctx.rect(x+3, y+3, w-6, h-6);
        ctx.stroke();

        ctx.save();
        ctx.clip();            

            ctx.fillStyle = rad_grad(x, y, w, h);
            ctx.fillRect(x, y, w, h);

            ctx.strokeRect(x, y, w, h);
            ctx.strokeStyle = d_shades[1];

        ctx.restore();


        ctx.beginPath();
        ctx.fillStyle = d_shades[1];
        ctx.moveTo(x, y);
        ctx.lineTo(x+(+w), y);
        ctx.lineTo(x+(+w)-2, y+2);
        ctx.lineTo(x+3, y+2);
        ctx.lineTo(x, y);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = base_color;
        ctx.moveTo(x,y);
        ctx.lineTo(x+3, y+2);
        ctx.lineTo(x+3, y+h-2);
        ctx.lineTo(x, y+h);
        ctx.lineTo(x,y);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = base_color;
        ctx.moveTo(x, y+h);
        ctx.lineTo(x+(+w), y+h);
        ctx.lineTo(x+(+w)-2, y+h-2);
        ctx.lineTo(x+3, y+h-2);
        ctx.lineTo(x, y+h);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = d_shades[2];
        ctx.moveTo(x+(+w),y);
        ctx.lineTo(x+(+w), y+h);
        ctx.lineTo(x+(+w)-3, y+h-2);
        ctx.lineTo(x+(+w)-3, y+2);
        ctx.lineTo(x+(+w),y);
        ctx.fill();

        
    }


    function create_panel_horizon(x, y, cs_spacing, p_count, p_height, l_shade, d_shade){

        if(selectedPanel== 'Insulated Glass'){
            if(p_width.length==1){
                var w_outside = (+p_width[0]);
            }
            else{
                var w_outside = (+p_width[0]);        
                var w_inside = (+p_width[1]);  
            }
        }
        else{
            var panel_width = p_width[0];
        }

        for(q=1; q<=p_count; q++){ 
            if(selectedPanel == 'Insulated Glass'){
                if(q==1 || q==p_count){
                    draw_panel(x, y, w_outside, p_height, l_shade, d_shade);
                    x = parseFloat(x)+parseFloat(w_outside)+parseFloat(cs_spacing);
                }
                else{
                    draw_panel(x, y, w_inside, p_height, l_shade, d_shade);
                    x = parseFloat(x)+parseFloat(w_inside)+parseFloat(cs_spacing);
                }
            }
            else{
                draw_panel(x, y, panel_width, p_height, l_shade, d_shade);
                x = parseFloat(x)+parseFloat(panel_width)+parseFloat(cs_spacing);
            }
        }
    }

    function draw_dividers_horizon(x, y, l_shadow, d_shadow){
        hr_divider(x, y, canvas.width, d_shadow[2]);
        hr_divider(x, y+1, canvas.width, l_shadow[2]);
    }

    function section_divider_horizon(sh_list, l_shade, d_shade, r_height, sPanel){
        var es_spacing = 0.0;
        var cs_spacing = 0.0;

        var sec_count = sh_list['s_count'];

        var rh_top_btm = r_height['top_btm'];
        var rh_int_top_btm = r_height['int_top_btm'];
        var rh_center = r_height['center'];
        
        var p_height = sh_list['pHeight_top'];
        var p_count = panel_count;

        if(p_endStile_spacing){
            es_spacing = convert_sizes(p_endStile_spacing);
        }

        if(p_centerStile_spacing){
            cs_spacing = convert_sizes(p_centerStile_spacing);
        }

        var x = es_spacing;
        var y = rh_top_btm;

        var d_width = canvas.width;


        for(s=1; s<=sec_count; s++){
            thin_line(0, y, d_width, d_shade[1]);

            create_panel_horizon(x, y, cs_spacing, p_count, p_height, l_shade, d_shade);

            y = y + p_height + rh_center;

            create_panel_horizon(x, y, cs_spacing, p_count, p_height, l_shade, d_shade);

            y = y + p_height;

            thin_line(0, y, d_width, d_shade[1]);

            y = y + rh_int_top_btm;

            if(s != sec_count){
                draw_dividers_horizon(0, y, l_shade, d_shade);   
            }
            
            y = y + rh_int_top_btm + 1;     
        }
        
    }


    // ==========================================================================  
    

    // --------------- start your Door ---------------------
    function door_area(base_color, d_width, d_height){

        ctx.fillStyle = base_color; 
        ctx.fillRect(0, 0, d_width, d_height);   
        ctx.fill(); 

    }

    // -------------------draw divider ------------------------

    function draw_dividers(panel_row, p_r_count, y, l_shadow, d_shadow){
        if(panel_row < p_r_count){
            hr_divider(0, y, canvas.width, d_shadow[2]);
            hr_divider(0, y+1, canvas.width, l_shadow[2]);
        }
    }

    // ----------------------hr divider --------------------------

    function hr_divider(mx, y, lx, clr){
        if(y<canvas.height){
            ctx.beginPath();
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = clr;
            ctx.moveTo(mx, y);
            ctx.lineTo(lx, y);
            ctx.stroke();
        }
        
    }

    function thin_line(x, y, w, d_shade){
        ctx.beginPath();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = d_shade;
        ctx.moveTo(x, y);
        ctx.lineTo(x+w, y);
        ctx.stroke();
    }

    // --------------------create panel------------------------

    function create_panel(s_height, e_spacing, c_spacing, p_count, p_height){
        

        var x = e_spacing;
        if(p_width.length==1){
            var w_outside = p_width[0];        
        }
        else{
            var w_outside = p_width[0];        
            var w_inside = p_width[1];        
        }
        

        for(q=1; q<=p_count; q++){  
            if(q==1 || q==p_count){
                draw_panel(x, s_height, w_outside, p_height, lighter_shades, darker_shades);
                x = parseFloat(x)+parseFloat(w_outside)+parseFloat(c_spacing);
            }
            else{
                draw_panel(x, s_height, w_inside, p_height, lighter_shades, darker_shades);
                x = parseFloat(x)+parseFloat(w_inside)+parseFloat(c_spacing);
            }
            
        }

        
        
        function draw_panel(x, y, w, h, l_shades, d_shades){
            ctx.strokeStyle = 'trasnparent';
            ctx.strokeRect(x, y, w, h);
            ctx.stroke();
            

            ctx.lineWidth = 1;
            ctx.fillStyle = 'transparent';
            ctx.strokeStyle = d_shades[0];
            ctx.strokeRect(x+3, y+3, w-6, h-6);
            ctx.stroke();

            ctx.rect(x+3, y+3, w-6, h-6);
            ctx.stroke();

            ctx.save();
            ctx.clip();

                ctx.fillStyle = rad_grad(x, y, w, h);
                ctx.fillRect(x, y, w, h);

            ctx.restore();

            ctx.beginPath();
            ctx.fillStyle = d_shades[1];
            ctx.moveTo(x, y);
            ctx.lineTo(x+(+w), y);
            ctx.lineTo(x+(+w)-2, y+2);
            ctx.lineTo(x+3, y+2);
            ctx.lineTo(x, y);
            ctx.fill();

            ctx.beginPath();
            ctx.fillStyle = l_shades[0];
            ctx.moveTo(x,y);
            ctx.lineTo(x+3, y+2);
            ctx.lineTo(x+3, y+h-2);
            ctx.lineTo(x, y+h);
            ctx.lineTo(x,y);
            ctx.fill();

            ctx.beginPath();
            ctx.fillStyle = l_shades[0];
            ctx.moveTo(x, y+h);
            ctx.lineTo(x+(+w), y+h);
            ctx.lineTo(x+(+w)-2, y+h-2);
            ctx.lineTo(x+3, y+h-2);
            ctx.lineTo(x, y+h);
            ctx.fill();

            ctx.beginPath();
            ctx.fillStyle = d_shades[2];
            ctx.moveTo(x+(+w),y);
            ctx.lineTo(x+(+w), y+h);
            ctx.lineTo(x+(+w)-3, y+h-2);
            ctx.lineTo(x+(+w)-3, y+2);
            ctx.lineTo(x+(+w),y);
            ctx.fill();

            
        }
    }

    // ------------------panel building --------------------

    function build_panel_section(l_count, s_count, s_hght, d_width, d_height, r_hght, d_shadow, s_h_list){
        var spacings = 0;
        var p_hght_top = s_h_list['pHeight_top'];
        var p_hght_int = s_h_list['pHeight_int'];
        var p_hght_btm = s_h_list['pHeight_btm'];  
        var p_hght_int_2 = s_h_list['pHeight_int_2'];

        var p_count = panel_count;
        var es_spacing = convert_sizes(p_endStile_spacing);
        var cs_spacing = convert_sizes(p_centerStile_spacing);
        
        for(k=1; k<=3; k++){
            if(k==1){
                if(l_count == 1){
                    s_hght = s_hght + r_hght['top_btm'];    
                }
                else{
                    s_hght = s_hght + r_hght['int_top_btm'];    
                }
                thin_line(0, s_hght, d_width, d_shadow);
            }
            else if(k==2){
                if(l_count==1 ){   
                    create_panel(s_hght, es_spacing, cs_spacing, p_count, p_hght_top);
                    s_hght = s_hght + p_hght_top
                }
                else if(l_count==s_count){
                    create_panel(s_hght, es_spacing, cs_spacing, p_count, p_hght_btm);
                    s_hght = s_hght + p_hght_btm;
                }
                else{ 
                    if(h_ft == 6.9 || h_ft == 7.9 || h_ft == 9.6 || h_ft == 11.3 || h_ft == 8.3){
                        if(l_count == (s_count-1)){
                            create_panel(s_hght, es_spacing, cs_spacing, p_count, p_hght_int_2);
                            s_hght = s_hght + p_hght_int_2;
                        }        
                        else{          
                            create_panel(s_hght, es_spacing, cs_spacing, p_count, p_hght_int);
                            s_hght = s_hght + p_hght_int;
                        }
                    }
                    else if(h_ft == 8.6 || h_ft == 9.9 || h_ft == 10.3){
                        if(l_count == (s_count-2)){
                            create_panel(s_hght, es_spacing, cs_spacing, p_count, p_hght_int);
                            s_hght = s_hght + p_hght_int;
                        }
                        else{
                            create_panel(s_hght, es_spacing, cs_spacing, p_count, p_hght_int_2);
                            s_hght = s_hght + p_hght_int_2;
                        }
                    }
                    else if(h_ft == 11.6){
                        if(l_count == 2 || l_count == (s_count-1)){
                            create_panel(s_hght, es_spacing, cs_spacing, p_count, p_hght_int_2);
                            s_hght = s_hght + p_hght_int_2;
                        }        
                        else{          
                            create_panel(s_hght, es_spacing, cs_spacing, p_count, p_hght_int);
                            s_hght = s_hght + p_hght_int;
                        }
                    }
                    else if(h_ft == 11.9){
                        if(l_count== 3){
                            create_panel(s_hght, es_spacing, cs_spacing, p_count, p_hght_int);
                            s_hght = s_hght + p_hght_int;
                        }
                        else{
                            create_panel(s_hght, es_spacing, cs_spacing, p_count, p_hght_int_2);
                            s_hght = s_hght + p_hght_int_2;
                        }
                    }
                    else{
                        create_panel(s_hght, es_spacing, cs_spacing, p_count, p_hght_int);
                        s_hght = s_hght + p_hght_int;
                    }
                }
                thin_line(0, s_hght, d_width, d_shadow);
            }
            else if(k==3){
                if(l_count==s_count){
                    s_hght = s_hght + r_hght['top_btm'];
                }
                else{
                    s_hght = s_hght + r_hght['int_top_btm']
                }
            }
        }
        
    }




    
    function build_panel_section_horizon(l_count, s_count, s_hght, d_width, d_height, r_hght, l_shadow, d_shadow, s_h_list){
        var spacings = 0;
        var p_hght_top = s_h_list['pHeight_top'];
        var p_hght_int = s_h_list['pHeight_int'];
        var p_hght_btm = s_h_list['pHeight_btm'];  

        var p_count = panel_count;
        var es_spacing = convert_sizes(p_endStile_spacing);
        var cs_spacing = convert_sizes(p_centerStile_spacing);
        
        

        for(k=1; k<=3; k++){
            if(k==1){
                if(l_count == 1){
                    s_hght = s_hght + r_hght['top_btm'];    
                }
                else{
                    s_hght = s_hght + r_hght['int_top_btm'];    
                }
                thin_line(0, s_hght, d_width, d_shadow[1]);
            }
            else if(k==2){
                if(l_count==1 ){   
                    create_panel(s_hght, es_spacing, cs_spacing, p_count, p_hght_top);
                    s_hght = s_hght + p_hght_top + r_hght['center'];
                    create_panel(s_hght, es_spacing, cs_spacing, p_count, p_hght_top);
                    s_hght = s_hght + p_hght_top
                }
                else if(l_count==s_count){
                    create_panel(s_hght, es_spacing, cs_spacing, p_count, p_hght_top);
                    s_hght = s_hght + p_hght_top + r_hght['center'];
                    create_panel(s_hght, es_spacing, cs_spacing, p_count, p_hght_top);
                    s_hght = s_hght + p_hght_btm;
                }
                else{
                    create_panel(s_hght, es_spacing, cs_spacing, p_count, p_hght_int);
                    s_hght = s_hght + p_hght_top + r_hght['center'];
                    create_panel(s_hght, es_spacing, cs_spacing, p_count, p_hght_top);
                    s_hght = s_hght + p_hght_int;
                }
                thin_line(0, s_hght, d_width, d_shadow[1]);
            }
            else if(k==3){
                if(l_count==s_count){
                    s_hght = s_hght + r_hght['top_btm'];
                }
                else{
                    s_hght = s_hght + r_hght['int_top_btm']
                }
                // draw_dividers(l_count, s_count, s_hght, l_shadow, d_shadow);
            }

            // console.log('s_hght - ', s_hght);
        }
                    
        
    }

    // -------------------section divider -----------------------

    function section_divider(s_h_list, l_shadow, d_shadow, r_heights, sPanel){
        
        var p_hght_int = 0;
        var sec_top = s_h_list['sh_top'];
        var sec_int = s_h_list['sh_int'];
        var sec_btm = s_h_list['sh_btm'];       
        var sec_int_2 = s_h_list['sh_int_2'];
        var sec_count = s_h_list['s_count'];

        var s_hght = 0;

        if(selectedPanel == 'Vista'){
            for(i = 1; i<=sec_count; i++){  
                if(i==1 || i==sec_count){
                    build_panel_section(i, sec_count, s_hght, canvas.width, canvas.height, r_heights, d_shadow[1], s_h_list);          
                    s_hght = s_hght + sec_top;
                    draw_dividers(i, sec_count, s_hght, l_shadow, d_shadow);            
                }
                else{
                    if(h_ft == 6.9 || h_ft == 7.9 || h_ft == 8.3 || h_ft == 9.6 || h_ft == 11.3){
                        if(i == (sec_count-1)){
                            build_panel_section(i, sec_count, s_hght, canvas.width, canvas.height, r_heights, d_shadow[1], s_h_list);          
                            s_hght = s_hght + sec_int_2;
                            draw_dividers(i, sec_count, s_hght, l_shadow, d_shadow); 
                        }
                        else{
                            build_panel_section(i, sec_count, s_hght, canvas.width, canvas.height, r_heights, d_shadow[1], s_h_list);          
                            s_hght = s_hght + sec_int;
                            draw_dividers(i, sec_count, s_hght, l_shadow, d_shadow);            
                        }
                    }
                    else if(h_ft == 8.6 || h_ft == 9.9 || h_ft == 10.3){
                        if(i == (sec_count-2)){
                            build_panel_section(i, sec_count, s_hght, canvas.width, canvas.height, r_heights, d_shadow[1], s_h_list);          
                            s_hght = s_hght + sec_int;
                            draw_dividers(i, sec_count, s_hght, l_shadow, d_shadow);            
                        }
                        else{
                            build_panel_section(i, sec_count, s_hght, canvas.width, canvas.height, r_heights, d_shadow[1], s_h_list);          
                            s_hght = s_hght + sec_int_2;
                            draw_dividers(i, sec_count, s_hght, l_shadow, d_shadow); 
                        }
                    }
                    else if(h_ft == 11.6){
                        if(i == 2 || i == (sec_count-1)){
                            build_panel_section(i, sec_count, s_hght, canvas.width, canvas.height, r_heights, d_shadow[1], s_h_list);          
                            s_hght = s_hght + sec_int_2;
                            draw_dividers(i, sec_count, s_hght, l_shadow, d_shadow);            
                        }
                        else{
                            build_panel_section(i, sec_count, s_hght, canvas.width, canvas.height, r_heights, d_shadow[1], s_h_list);          
                            s_hght = s_hght + sec_int;
                            draw_dividers(i, sec_count, s_hght, l_shadow, d_shadow);    
                        }
                    }
                    else if(h_ft == 11.9){
                        if(i == 3){
                            build_panel_section(i, sec_count, s_hght, canvas.width, canvas.height, r_heights, d_shadow[1], s_h_list);          
                            s_hght = s_hght + sec_int;
                            draw_dividers(i, sec_count, s_hght, l_shadow, d_shadow);  
                        }
                        else{
                            build_panel_section(i, sec_count, s_hght, canvas.width, canvas.height, r_heights, d_shadow[1], s_h_list);          
                            s_hght = s_hght + sec_int_2;
                            draw_dividers(i, sec_count, s_hght, l_shadow, d_shadow);
                        }
                    }
                    else{
                        build_panel_section(i, sec_count, s_hght, canvas.width, canvas.height, r_heights, d_shadow[1], s_h_list);          
                        s_hght = s_hght + sec_int;
                        draw_dividers(i, sec_count, s_hght, l_shadow, d_shadow);
                    }
                }
            }
        }

       

    }

    // --------------------- bottom section --------------------------
    function bottom_line(){
        ctx.fillStyle = 'black';
        ctx.fillRect(0, canvas.height-4, canvas.width, 4);
        ctx.fill();
    }
    
    var endtime = performance.now();
}