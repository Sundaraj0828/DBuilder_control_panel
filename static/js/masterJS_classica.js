function draw(){  
    console.time('draw');

    var starttime = performance.now();

    var canvas = document.getElementById("door");

    if(canvas.getContext){
        var ctx = canvas.getContext("2d"); 
    }
    

    

    // =========================================================================
    var w_ft = 0.0;
    var h_ft = 0.0;

    var selectedColor = '';
    var selectedPanel = '';
    var selectedGlassType = '';
    var selectedWindow = '';

    var width_options = [];
    var section_heights = [];    

    var s_height_list = [];

    var s_height_count = [];

    var panel_height = {};

    var door_size = []

    var rail_height = 0.0;

    var endStile_spacing = {};

    var panel_spacing = 0.0;

    var pairOfPanels_spacing = {};

    var p_width = [];

    var panel_pairs = {};

    var panel_count = {};

    var panel_width = 0.0;

    var panelsPair_width = 0.0;

    var base_color = '';

    var color_shades = [];

    var lighter_shades = [];

    var darker_shades = [];

    var width_height_px = [];

    
    var door_width = 0;
    var door_height = 0;

    var shadow_width = 0;

    var p_pairs = [];
    var pp_pairs = [];
    var es_spacing = [];

    var bottom_border = 0;



    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    w_ft = document.getElementById("door_w").value;  //----ft
    h_ft = document.getElementById("door_h").value;  //----ft

    

    if(w_ft && h_ft){
        selectedColor = document.getElementById('colors').value;

        selectedPanel = document.getElementById("panels").value;

        selectedGlassType = document.getElementById('glassType').value; 

        selectedWindow = document.getElementById('classicaWindows').value;

        closed_w = document.getElementById('classica_windows');
        glazed_w = document.getElementById('classica_glazed_windows');

        if(selectedPanel){
            document.getElementById('classicaWindows').disabled = false;
            if(selectedGlassType == 'closed'){
                closed_w.disabled = false ;
                glazed_w.disabled = true ;
            }
            else{
                closed_w.disabled = true ;
                glazed_w.disabled = false ;
            }
        }
        else{
            document.getElementById('classicaWindows').disabled = true ;
        }
    }
    else{
        alert('select width and height first');
    }

    // =========================================================================


    width_options = [800, 900, 1000];

    section_heights = [18, 21, 28, 32];  // ----inch

    s_height_count = [3, 4, 5, 6];   

    rail_height = 2.125;

    panel_spacing = 3.198;

    panel_width = 18.852;

    panelsPair_width = 40.902;

    p_pairs = [2, 3, 4, 5];

    pp_pairs = [4, 6, 8, 10];

    es_spacing = [4.174, 7.174, 10.174, 13.174, 6.424, 4.924];

    bottom_border = 4;

    if(w_ft){         
        endStile_spacing = {
            8 : es_spacing[0],
            9 : es_spacing[1],
            10 : es_spacing[2],
            12 : es_spacing[0],
            14 : es_spacing[2],
            15 : es_spacing[3],
            16 : es_spacing[0],
            17 : es_spacing[5],
            18 : es_spacing[4],
            20 : es_spacing[0]
        };
        pairOfPanels_spacing = {
            8 : 5.848,
            9 : 11.848,
            10 : 17.848,
            12 : 6.473,
            14 : 12.473,
            15 : 15.473,
            16 : 6.681,
            17 : 10.182,
            18 : 13.182,
            20 : 6.786
        };
        panel_pairs = {
            8 : p_pairs[0], // p_pairs = [2, 3, 4, 5];
            9 : p_pairs[0],
            10 : p_pairs[0],
            12 : p_pairs[1],
            14 : p_pairs[1],
            15 : p_pairs[1],
            16 : p_pairs[2],
            17 : p_pairs[2],
            18 : p_pairs[2],
            20 : p_pairs[3]
        };
        panel_count = {
            8 : pp_pairs[0], // pp_pairs = [4, 6, 8, 10];
            9 : pp_pairs[0],
            10 : pp_pairs[0], 
            12 : pp_pairs[1],
            14 : pp_pairs[1],
            15 : pp_pairs[1],
            16 : pp_pairs[2],
            17 : pp_pairs[2],
            18 : pp_pairs[2],
            20 : pp_pairs[3]
        };


    } 

    if(h_ft){
        panel_height = {
            28 : 23.5,
            32 : 27.5,
            21 : 16.5,
            18 : 13.5
        };
    }


    // ====================================================================

    function get_width_height_in_px(w_ft, h_ft, width_options){
        if(w_ft>=8 && w_ft<=9){
            var h_split = [];
            var h_split = h_ft.split("' ");

            h_in = (parseInt(h_split[0])*12) + parseInt(h_split[1]);
            w_in = w_ft*12; 
            door_width = width_options[0]
            door_height = door_width*(h_in/w_in)+bottom_border

        }
        else if(w_ft>=10 && w_ft <= 16){  
            var h_split = [];
            var h_split = h_ft.split("' ");
             
            h_in = (parseInt(h_split[0])*12) + parseInt(h_split[1]);
            w_in = w_ft*12; 
            door_width = width_options[1];            
            door_height = door_width*(h_in/w_in)+bottom_border
        }
        else if(w_ft>=17 && w_ft<=20){ 
            var h_split = [];
            var h_split = h_ft.split("' ");
             
            h_in = (parseInt(h_split[0])*12) + parseInt(h_split[1]);
            w_in = w_ft*12;
            door_width = width_options[2]
            door_height = door_width*(h_in/w_in)+bottom_border
        }

        if(door_width && door_height){
            door_size = [door_width, door_height] 
        }
        return door_size
    }


   

    function convert_sizes_inch(item){        
        var item_px = canvas.width*(item/(w_ft*12))        
        return item_px;
    }


    // ----------------------------get section height
    function get_section_heights(h){
        var height_values = {};
        var sec_height = [];
        var p_height = [];
        var s_height = [];

        // --------------------Section count
        if(h=="06' 02"||h=="06' 05"||h=="06' 06"||h=="06' 09"||h=="06' 10"||h=="07' 00"||h=="07' 01"||h=="07' 04"||h=="07' 08"||h=="08' 00"){
            height_values['s_count'] = s_height_count[0];
        }
        else if(h=="08' 06"||h=="08' 09"||h=="08' 10"||h=="09' 01"||h=="09' 02"||h=="09' 04"||h=="09' 05"||h=="09' 06"||h=="09' 08"||h=="09' 09"||h=="10' 00"||h=="10' 04"||h=="10' 08"){
            height_values['s_count'] = s_height_count[1];
        }
        else if(h=="10' 10"||h=="11' 01"||h=="11' 02"||h=="11' 05"||h=="11' 06"||h=="11' 08"||h=="11' 09"||h=="11' 10"||h=="12' 00"||h=="12' 01"||h=="12' 02"||h=="12' 04"||h=="12' 05"||h=="12' 08"||h=="13' 00"||h=="13' 04"){
            height_values['s_count'] = s_height_count[2];
        }
        else if(h=="13' 02"||h=="13' 05"||h=="13' 06"||h=="14' 00"){
            height_values['s_count'] = s_height_count[3];
        }

        // -----------------------Section Height
        if(h == "06' 02" || h == "08' 06" || h == "10' 10" || h == "13' 02"){
            s_height = [section_heights[0], section_heights[2]]; // 18, 28
        }
        else if(h == "06' 05" || h == "08' 09" || h == "11' 01" || h == "13' 05"){
            s_height = [section_heights[1], section_heights[2]]; // 21, 28
        }
        else if(h == "06' 06" || h == "08' 10" || h == "09' 02" || h == "11' 02" || h == "11' 06" || h == "11' 10" || h == "13' 06"){
            s_height = [section_heights[0], section_heights[2], section_heights[3]]; // 18, 28, 32
        }
        else if(h == "06' 09" || h == "09' 01" || h == "09' 05" || h == "11' 05" || h == "11' 09" || h == "12' 01"){
            s_height = [section_heights[1], section_heights[2], section_heights[3]]; // 21, 28, 32
        }
        else if(h == "06' 10" || h == "09' 06" || h == "12' 02"){
            s_height = [section_heights[0], section_heights[3]]; // 18, 32
        }
        else if(h == "07' 01" || h == "09' 09" || h == "12' 05"){
            s_height = [section_heights[1], section_heights[3]]; // 21, 32
        }
        else if(h == "07' 04" || h == "07' 08" || h == "09' 08" || h == "10' 00" || h == "10' 04" || h == "12' 00" || h == "12' 04" || h == "12' 08" || h == "13' 00"){
            s_height = [section_heights[2], section_heights[3]]; // 28, 32
        }
        else if(h == "07' 00" || h == "09' 04" || h == "11' 08" || h=="14' 00"){
            s_height = [section_heights[2]]; // 28 each
        }
        else if(h == "08' 00" || h == "10' 08" || "13' 04"){
            s_height = [section_heights[3]]; // 32 each
        }

        // -------------------------section height conversion

        for(i = 0; i<s_height.length; i++){            
            converted_sec_height = convert_sizes_inch(s_height[i]).toFixed(3); 
            sec_height.push(parseFloat(converted_sec_height));            
        }

        height_values['s_height'] = sec_height;
        
        // -------------------------panel height conversion
        if(selectedPanel){
            for(p = 0; p<s_height.length; p++){
                sh = s_height[p];
                converted_p_height = convert_sizes_inch(panel_height[sh]).toFixed(3); 
                p_height.push(parseFloat(converted_p_height));

            }
            height_values['panel_height'] = p_height;
            
        }

        height_values['r_height'] = parseFloat(convert_sizes_inch(rail_height).toFixed(3));

        

        return height_values
    }


    function door_area(d_width, d_height, b_color){
        ctx.fillStyle = b_color; 
        ctx.fillRect(0, 0, d_width, d_height);   
        ctx.fill(); 

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
        var inc_val = 0;

        if(sColor){            
            base_color = sColor;
            

            for(i=1; i<=3; i++){
                var lighter1 = LightenDarkenColor(sColor, 10*i);
                l_shades.push(lighter1);
            }
            
            for(j=1; j<=3; j++){
                var inc_val = '';
                if(sColor == '#244f6f'){
                    inc_val = (-6)*j;
                }
                else if(sColor == '#181818'){
                    inc_val = (-5)-2;
                }
                else{
                    inc_val = (-10)*j;
                }
                var darker1 = LightenDarkenColor(sColor, inc_val);
                d_shades.push(darker1);
            }
            
        }

        return [base_color, l_shades, d_shades]
    }


    // -----------------------------------------value percentage generator

    function p_val(w, v){
        var val_1 = w/100;
        var val_2 = v * val_1;

        return val_2;
    }
    // ----------------------------------------------------------------------


    function rad_grad(x, y, w, h){
        if(selectedPanel){
            if(selectedGlassType == 'clear'){                  
                win_grad = ctx.createRadialGradient((+x) + p_val(w, 8), y + p_val(w, 8 ), p_val(w, 3), x + p_val(w, 30) , y + p_val(w, 20), p_val(w, 50));
            }
            else if( selectedGlassType == 'frost' || selectedGlassType == 'dark_tint'){
                win_grad = ctx.createLinearGradient(x, y, x+(w/2), (+y) + p_val(w, 50));
            }
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
            win_grad.addColorStop(.9,"rgb(52, 79, 108)");
        }
        
        ctx.fillStyle = win_grad;
    }




    // --------------------------------------------------------------------

    base_color = selectedColor;

    if(w_ft && h_ft){
        width_height_px = get_width_height_in_px(w_ft, h_ft, width_options);

        canvas.width = width_height_px[0]
        canvas.height = width_height_px[1]

        s_height_list = get_section_heights(h_ft);
        color_shades = get_color_schemes(base_color);        
    }  

    lighter_shades = color_shades[1];

    darker_shades = color_shades[2];

    function hr_divider(mx, y, lx, clr){
        if(y<canvas.height-4){
            ctx.beginPath();
            ctx.lineWidth = 0.5;
            ctx.fillStyle = 'transparent';
            ctx.strokeStyle = clr;
            ctx.moveTo(mx, y);
            ctx.lineTo(lx, y);
            ctx.closePath();
            ctx.stroke();
        }
        
    }

    function draw_dividers(panel_row, p_r_count, y, l_shadow, d_shadow){
        if(panel_row < (p_r_count)){
            hr_divider(0, y, canvas.width, d_shadow[2]);
            hr_divider(0, y+1, canvas.width, l_shadow[2]);
        }
    }


    function section_divider(sh_list, l_shades, d_shades){
        var s_hght = 0;
        var sec_count = sh_list['s_count'];
        var s_height = sh_list['s_height'];
        for(d=1; d<sec_count; d++){
            if(s_height.length == 1){
                s_hght = (+s_hght) + (+s_height[0]);                
            }
            else if(s_height.length == 2){
                if(h_ft=="06' 02" || h_ft=="06' 05" || h_ft=="06' 10" || h_ft=="07' 01" || h_ft=="07' 08" || h_ft=="08' 06" || h_ft=="08' 09" || h_ft=="09' 06" || h_ft=="09' 09" || h_ft=="10' 04" || h_ft=="10' 10" || h_ft=="11' 01" || h_ft=="12' 02" || h_ft=="12' 05" || h_ft=="13' 00" || h_ft=="13' 02" || h_ft=="13' 05"){
                    if(d == 1){
                        s_hght = (+s_hght) + (+s_height[0]);
                    }
                    else{
                        s_hght = (+s_hght) + (+s_height[1]);
                    }                    
                }
                else if(h_ft=="07' 04" ){
                    if(d == 1){
                        s_hght = (+s_hght) + (+s_height[1]);
                    }
                    else{
                        s_hght = (+s_hght) + (+s_height[0]);
                    }
                }
                else if(h_ft=="09' 08" || h_ft=="12' 00"){
                    if(d==sec_count){
                        s_hght = (+s_hght) + (+s_height[1]);
                    }
                    else{
                        s_hght = (+s_hght) + (+s_height[0]);
                    }
                }
                else if(h_ft=="10' 00"|| h_ft=="12' 08"){
                    if(d==1 || d==2){
                        s_hght = (+s_hght) + (+s_height[0]);
                    }
                    else{
                        s_hght = (+s_hght) + (+s_height[1]);
                    }
                }  
                else if(h_ft=="12' 04" ){
                    if(d==sec_count || d==(sec_count-1)){
                        s_hght = (+s_hght) + (+s_height[1]);
                    }
                    else{
                        s_hght = (+s_hght) + (+s_height[0]);
                    }
                }              
            }
            else if(s_height.length == 3){
                if(h_ft=="06' 06" || h_ft=="08' 10" || h_ft=="11' 02" || h_ft=="06' 09" || h_ft=="09' 01" || h_ft=="11' 05"){
                    if(d==1){
                        s_hght = (+s_hght) + (+s_height[0]);
                    }
                    else if(d==sec_count){
                        s_hght = (+s_hght) + (+s_height[2]);
                    }
                    else{
                        s_hght = (+s_hght) + (+s_height[1]);
                    }
                }
                else if(h_ft=="09' 02" || h_ft=="11' 06" || h_ft=="09' 05" || h_ft=="11' 09"){
                    if(d==1){
                        s_hght = (+s_hght) + (+s_height[0]);
                    }
                    else if(d==sec_count || d==(sec_count-1)){
                        s_hght = (+s_hght) + (+s_height[2]);
                    }
                    else{
                        s_hght = (+s_hght) + (+s_height[1]);
                    }
                }
                else if(h_ft=="11' 10" || h_ft=="12' 01"){
                    if(d==1){
                        s_hght = (+s_hght) + (+s_height[0]);
                    }
                    else if(d==2){
                        s_hght = (+s_hght) + (+s_height[1]);
                    }
                    else{
                        s_hght = (+s_hght) + (+s_height[2]);
                    }
                }
                else if(h_ft=="13' 06"){
                    if(d==1){
                        s_hght = (+s_hght) + (+s_height[2]);
                    }
                    else if(d==2){
                        s_hght = (+s_hght) + (+s_height[0]);
                    }
                    else{
                        s_hght = (+s_hght) + (+s_height[1]);
                    }
                }
            }
            draw_dividers(d, sec_count, s_hght, l_shades, d_shades);           
        }
        
    }

    // ----------------------------------------------------------------

  

    function stamp_outline(x, y, w, h, l_shade, d_shade){ 
        ctx.strokeStyle = l_shade[2];
        ctx.strokeRect(x+p_val(w, 0.5), y+p_val(w, 0.5), w, h);
        ctx.stroke();
        
        ctx.strokeStyle = d_shade[2];
        ctx.strokeRect(x, y, w, h);
        ctx.stroke();
    }

    function stamp_outline_nb(x, y, w, h, l_shade, d_shade, p_count){ 
        if(p_count%2){
            var cp_x = x + (w/2) - 30;
            var cp_y = y + 10;
        }
        else{
            var cp_x = x + (w/2) + 30;
            var cp_y = y + 10;
        }

        if(p_count%2){
            ctx.beginPath();
            ctx.strokeStyle = l_shade[2];
            ctx.moveTo(x+p_val(w, 0.5), y+p_val(w, 0.5) + (h/2) - p_val(w, 5));
            ctx.quadraticCurveTo(cp_x, cp_y, (+x + p_val(w, 0.5)) + (+w), y+p_val(w, 0.5) );
            ctx.lineTo((+x) + (+p_val(w, 0.5)) + (+w), y+p_val(w, 0.5) + h);
            ctx.lineTo(x+p_val(w, 0.5), y+p_val(w, 0.5) + h);
            ctx.lineTo(x+p_val(w, 0.5), y+p_val(w, 0.5) + (h/2) - p_val(w, 5));
            ctx.stroke();

            ctx.beginPath();
            ctx.strokeStyle = d_shade[2];
            ctx.moveTo(x, y + (h/2) - p_val(w, 5));
            ctx.quadraticCurveTo(cp_x, cp_y, (+x) + (+w), y );
            ctx.lineTo((+x) + (+w), y + h);
            ctx.lineTo(x, y + h);
            ctx.lineTo(x, y + (h/2) - p_val(w, 5));
            ctx.stroke();
        }
        else{
            ctx.beginPath();
            ctx.strokeStyle = l_shade[2];
            ctx.moveTo(x+p_val(w, 0.5), y +p_val(w, 0.5));
            ctx.quadraticCurveTo(cp_x, cp_y, (+x +p_val(w, 0.5)) + (+w), y+p_val(w, 0.5) + (h/2) - p_val(w, 5));
            ctx.lineTo((+x + (+p_val(w, 0.5))) + (+w), y+p_val(w, 0.5) + h);
            ctx.lineTo(x+p_val(w, 0.5), y+p_val(w, 0.5) + h);
            ctx.lineTo(x+p_val(w, 0.5), y+p_val(w, 0.5));
            ctx.stroke();

            ctx.beginPath();
            ctx.strokeStyle = d_shade[2];
            ctx.moveTo(x, y );
            ctx.quadraticCurveTo(cp_x, cp_y, (+x) + (+w), y + (h/2) - p_val(w, 5));
            ctx.lineTo((+x) + (+w), y + h);
            ctx.lineTo(x, y + h);
            ctx.lineTo(x, y);
            ctx.stroke();
        }

        
    }


    function stamp_inner_outline(x, y, w, h, ls, ds, p_count, s, p_w){
        // coordinate y1
        if(p_count%2){
            if(s==1){
                if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y + (h/2) - p_val(h, 26.5);
                    var y2 = y1 - p_val(h, 10);
                    var y3 = y2 + p_val(h, 4);
                }
                else{
                    var y1 = y + (h/2) - p_val(h, 27);
                    var y2 = y1 - p_val(h, 9);
                    var y3 = y2 + p_val(h, 3.5);
                }
            }
            else if(s==2){
                if(h_ft=="06' 02" || h_ft=="06' 05" || h_ft=="06' 06" || h_ft=="06' 09" || h_ft=="06' 10" || h_ft=="07' 01" || h_ft=="08' 06" || h_ft=="08' 09" || h_ft=="13' 05" || h_ft=="13' 02" || h_ft=="12' 05" || h_ft=="11' 09" || h_ft=="12' 01" || h_ft=="12' 02" || h_ft=="08' 10" || h_ft=="11' 10" || h_ft=="11' 05" || h_ft=="11' 06" || h_ft=="11' 01" || h_ft=="11' 02" || h_ft=="10' 10" || h_ft=="09' 06" || h_ft=="09' 09" || h_ft=="09' 01" || h_ft=="09' 02" || h_ft=="09' 05"){
                    var y1 = y + p_val(h, 12.5);             
                    var y2 = y1 - p_val(h, 6);
                    var y3 = y2 + p_val(h, 2);              
                }
                else{
                    var y1 = y + p_val(h, 11);             
                    var y2 = y1 - p_val(h, 6);
                    var y3 = y2 + p_val(h, 2);              
                }
                
            }
            else if(s == 3){
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){
                    var y1 = y + p_val(h, 5);
                    var y2 = y1 - p_val(h, 2.5);
                    var y3 = y2 + p_val(h, 0.5);
                }
                else{
                    var y1 = y + p_val(h, 4);
                    var y2 = y1 - p_val(h, 3);
                    var y3 = y2 + p_val(h, 0.5);
                }
            }
            else{
                // 18
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){
                    var y1 = y + (h/2) - p_val(h, 12);   
                    var y2 = y1 - p_val(h, 12);
                    var y3 = y2 + p_val(h, 6); 
                }
                // 21
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){
                    var y1 = y + (h/2) - p_val(h, 10);   
                    var y2 = y1 - p_val(h, 13);
                    var y3 = y2 + p_val(h, 6); 
                }
                // 32
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y + (h/2) - p_val(h, 6);   
                    var y2 = y1 - p_val(h, 16);
                    var y3 = y2 + p_val(h, 6);
                }
                // 28
                else{
                    var y1 = y + (h/2) - p_val(h, 6.7);   
                    var y2 = y1 - p_val(h, 16);
                    var y3 = y2 + p_val(h, 6);
                }
                            
            }
        }
        else{     
            if(s==1){    
                if(h_ft=="06' 02" || h_ft=="06' 05" || h_ft=="06' 06" || h_ft=="06' 09" || h_ft=="06' 10" || h_ft=="07' 01" || h_ft=="08' 06" || h_ft=="08' 09" || h_ft=="13' 05" || h_ft=="13' 02" || h_ft=="12' 05" || h_ft=="08' 10" || h_ft=="12' 01" || h_ft=="12' 02" || h_ft=="11' 10" || h_ft=="11' 09" || h_ft=="11' 06" || h_ft=="11' 05" || h_ft=="11' 02" || h_ft=="11' 01" || h_ft=="10' 10" || h_ft=="09' 09" || h_ft=="09' 06" || h_ft=="09' 01" || h_ft=="09' 02" || h_ft=="09' 05"){
                    var y1 = y + p_val(h, 5.5);          
                    var y2 = y1 + p_val(h, 6);
                    var y3 = y2 - p_val(h, 3);                    
                }
                else{
                    var y1 = y + p_val(h, 4.5);          
                    var y2 = y1 + p_val(h, 6);
                    var y3 = y2 - p_val(h, 3);
                }
            }
            else if(s==2){
                if(h_ft=="06' 02" || h_ft=="06' 05" || h_ft=="06' 06" || h_ft=="06' 09" || h_ft=="06' 10" || h_ft=="07' 01" || h_ft=="08' 06" || h_ft=="08' 09" || h_ft=="13' 05" || h_ft=="13' 02" || h_ft=="08' 10" || h_ft=="12' 05" || h_ft=="12' 01" || h_ft=="12' 02" || h_ft=="11' 10" || h_ft=="11' 09" || h_ft=="11' 06" || h_ft=="11' 05" || h_ft=="11' 02" || h_ft=="11' 01" || h_ft=="10' 10" || h_ft=="09' 09" || h_ft=="09' 01" || h_ft=="09' 06" || h_ft=="09' 02" || h_ft=="09' 05"){              
                    var y1 = y + p_val(h, 14);         
                    var y2 = y1 + p_val(h, 9);
                    var y3 = y2 - p_val(h, 7);
                }
                else{            
                    var y1 = y + p_val(h, 13);         
                    var y2 = y1 + p_val(h, 10);
                    var y3 = y2 - p_val(h, 6);
                }  
            }
            else if(s==3){
                if(h_ft=="06' 02" || h_ft=="06' 05" || h_ft=="06' 06" || h_ft=="06' 09" || h_ft=="06' 10" || h_ft=="07' 01" || h_ft=="08' 06" || h_ft=="08' 09" || h_ft=="13' 05" || h_ft=="13' 02" || h_ft=="08' 10" || h_ft=="12' 05" || h_ft=="12' 01" || h_ft=="12' 02" || h_ft=="11' 10" || h_ft=="11' 09" || h_ft=="11' 06" || h_ft=="11' 05" || h_ft=="11' 02" || h_ft=="11' 01" || h_ft=="10' 10" || h_ft=="09' 09" || h_ft=="09' 01" || h_ft=="09' 02" || h_ft=="09' 05" || h_ft=="09' 06"){ 
                    var y1 = y + (h/2) - p_val(h, 24);
                    var y2 = y1 + p_val(h, 12.5);
                    var y3 = y2 - p_val(h, 7);
                }
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y + (h/2) - p_val(h, 22.5);
                    var y2 = y1 + p_val(h, 15.5);
                    var y3 = y2 - p_val(h, 8.5);
                }
                else{
                    var y1 = y + (h/2) - p_val(h, 22.5);
                    var y2 = y1 + p_val(h, 14.5);
                    var y3 = y2 - p_val(h, 7);
                }
            }
            else{
                if(h_ft=="06' 02" || h_ft=="06' 05" || h_ft=="06' 06" || h_ft=="06' 09" || h_ft=="06' 10" || h_ft=="07' 01" || h_ft=="08' 06" || h_ft=="08' 09" || h_ft=="13' 05" || h_ft=="13' 02" || h_ft=="08' 10" || h_ft=="12' 05" || h_ft=="12' 01" || h_ft=="12' 02" || h_ft=="11' 10" || h_ft=="11' 09" || h_ft=="11' 06" || h_ft=="11' 02" || h_ft=="11' 05" || h_ft=="11' 01" || h_ft=="10' 10" || h_ft=="09' 09" || h_ft=="09' 01" || h_ft=="09' 02" || h_ft=="09' 05" || h_ft=="09' 06"){
                    var y1 = y + p_val(h, 1.5);          
                    var y2 = y1 + p_val(h, 3);
                    var y3 = y2 - p_val(h, 2);
                }
                else{
                    var y1 = y + p_val(h, 0.2);          
                    var y2 = y1 + p_val(h, 3);
                    var y3 = y2 - p_val(h, 2);

                }
            }
        }

        
        
        
        

        ctx.beginPath();
        ctx.strokeStyle = ds[2];
        ctx.moveTo(x, y1);
        ctx.quadraticCurveTo(x + (w/2), y3, x + w, y2);
        ctx.lineTo(x + w, y + h);
        ctx.lineTo(x, y + h);
        ctx.lineTo(x, y1);
        ctx.stroke();
    }

    function archedStamp_outline_l(x, y, w, h, cp_x, cp_y, l_shade, d_shade, ps){ 
            if(ps == 0){
                var h1 = (+y) + (+h/3) + p_val(w, 5);
                var h2 = (+y) + p_val(w, 7);
            }
            else{
                var h1 = (+y) + p_val(w, 4.5);
                var h2 = y;
            }
           

            ctx.beginPath();
            ctx.strokeStyle = d_shade[2];
            // ctx.strokeStyle = 'red';
            ctx.moveTo(x, (+y) + (+h));
            ctx.lineTo(x, h1);
            ctx.quadraticCurveTo(cp_x, cp_y, (+x) + (+w), h2);
            ctx.lineTo((+x) + (+w), (+y) + (+h));
            ctx.lineTo(x, (+y) + (+h));
            ctx.stroke();

            ctx.beginPath();
            ctx.strokeStyle = l_shade[2];
            // ctx.strokeStyle = 'green';
            ctx.moveTo(x + p_val(w, 0.5), (+y) + (+h) + p_val(w, 0.5));
            ctx.lineTo(x + p_val(w, 0.5), h1 + p_val(w, 0.5));
            ctx. quadraticCurveTo(cp_x, cp_y, (+x) + (+w) + p_val(w, 0.5), h2 + p_val(w, 0.5));
            ctx.lineTo((+x) + (+w) + p_val(w, 0.5), (+y) + (+h) + p_val(w, 0.5));
            ctx.lineTo(x + p_val(w, 0.5), (+y) + (+h) + p_val(w, 0.5));
            ctx.stroke();
    }

    function archedStamp_outline_r(x, y, w, h, cp_x, cp_y, l_shade, d_shade, ps){ 
            if(ps == 0){
                var h1 = y;
                var h2 = (+y) + p_val(w, 4.5);
            }
            else{
                var h1 = (+y) + p_val(w, 7);
                var h2 = (+y) + (+h/3) + p_val(w, 5);
            }

            

            ctx.beginPath();
            ctx.strokeStyle = d_shade[2];
            // ctx.strokeStyle = 'red';
            ctx.moveTo(x, (+y) + (+h));
            ctx.lineTo(x, h1);
            ctx. quadraticCurveTo(cp_x, cp_y, (+x) + (+w), h2);
            ctx.lineTo((+x) + (+w), (+y) + (+h));
            ctx.lineTo(x, (+y) + (+h));
            ctx.stroke();

            ctx.beginPath();
            ctx.strokeStyle = l_shade[2];
            // ctx.strokeStyle = 'green';
            ctx.moveTo(x + 1, (+y) + (+h) + 1);
            ctx.lineTo(x + 1, h1 + 1);
            ctx. quadraticCurveTo(cp_x, cp_y, (+x) + (+w) + 1, h2 + 1);
            ctx.lineTo((+x) + (+w) + 1, (+y) + (+h) + 1);
            ctx.lineTo(x + 1, (+y) + (+h) + 1);
            ctx.stroke();
    }

    function top_shadow(x, y, w, top_shadow, shadow_width){
        var sw = p_val(w, shadow_width);
        ctx.beginPath();
        ctx.fillStyle = top_shadow ;

        ctx.strokeStyle = 'transparent';
        ctx.moveTo(x, y);
        ctx.lineTo(x+w, y);
        ctx.lineTo(x+w-sw, y+sw);
        ctx.lineTo(x+sw, y+sw);
        ctx.closePath();
        ctx.fill();
    }

    

    function top_shadow_arched(x, y, w, top_shadow, shadow_width, pairs){
        if(pairs%2){
            if(ps == 0){
                var y1 = y + p_val(w, 48.5);
                var y1_inner = y1 + p_val(w, 3);
                var y2 = y + p_val(w, 9);
                var y2_inner = y2 + p_val(w, 6);
                var cp_x = x + (w/3);
                var cp_y = y2 + p_val(w, 19);
            }
            else{
                var y1 = y + p_val(w, 5.5);
                var y1_inner = y1 + p_val(w, 3.5);
                var y2 = y ;
                var y2_inner = y2 + p_val(w, 4);
                var cp_x = x + (w/2);
                var cp_y = y - p_val(w, 0.5);
            }
        }
        else{
            if(ps == 0){
                var y1 = y ;
                var y1_inner = y1 + p_val(w, 4);
                var y2 = y + p_val(w, 5.5);
                var y2_inner = y2 + p_val(w, 3.5);
                var cp_x = x + (w/3);
                var cp_y = y - p_val(w, 0.5);
            }
            else{
                var y1 = y + p_val(w, 9);
                var y1_inner = y1 + p_val(w, 6);
                var y2 = y + p_val(w, 48.5);
                var y2_inner = y2 + p_val(w, 4);
                var cp_x = x + (w/2);
                var cp_y = y + p_val(w, 23);
            }
        }
        
        var sw = p_val(w, shadow_width);

        ctx.beginPath();
        ctx.fillStyle = top_shadow ;
        // ctx.fillStyle = 'red' ;
        ctx.strokeStyle = 'transparent';
        ctx.moveTo(x, y1);
        ctx.quadraticCurveTo(cp_x, cp_y, (+x) + (+w), y2);
        ctx.lineTo((+x) + (+w) - sw, y2_inner);
        ctx.quadraticCurveTo(cp_x + sw, cp_y + sw, x + sw, y1_inner);
        ctx.fill();
    }

    function left_shadow(x, y, ly, l_shadow, w, shadow_width){    
        var sw = p_val(w, shadow_width);
        ctx.beginPath();
        ctx.fillStyle = l_shadow;
        ctx.strokeStyle = 'transparent';
        ctx.moveTo(x, y);
        ctx.lineTo(x+sw, y+sw);
        ctx.lineTo(x+sw, ly-sw);
        ctx.lineTo(x, ly);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.fill();
    }

    function top_shadow_nb_inner(x, y, w, top_shadow, shadow_width, h, p_count, s_count){
        if(p_count%2){
            if(s_count == 0){
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){
                    var y1 = y + (h/2) - p_val(w, 24.5);
                    var y1_inner = y1 + p_val(w, 10);  
                    var y2 = y1 - p_val(w, 18.5); 
                    var y2_inner = y2 + p_val(w, 16);  
                    var y3 = y1 - p_val(w, 7.5); 
                    var y3_inner = y3 + p_val(w, 7);
                }
                // 21
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){
                    var y1 = y + (h/2) - p_val(w, 23.5);
                    var y1_inner = y1 + p_val(w, 7);  
                    var y2 = y1 - p_val(w, 26.5); 
                    var y2_inner = y2 + p_val(w, 16);  
                    var y3 = y1 - p_val(w, 12); 
                    var y3_inner = y3 + p_val(w, 8);
                }
                // 32
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y + (h/2) - p_val(w, 23);
                    var y1_inner = y1 + p_val(w, 7);  
                    var y2 = y1 - p_val(w, 56.5); 
                    var y2_inner = y2 + p_val(w, 23);  
                    var y3 = y1 - p_val(w, 32); 
                    var y3_inner = y3 + p_val(w, 12);
                }
                // 28
                else{
                    var y1 = y + (h/2) - p_val(w, 24.5);
                    var y1_inner = y1 + p_val(w, 6.5);  
                    var y2 = y1 - p_val(w, 46.5); 
                    var y2_inner = y2 + p_val(w, 20);  
                    var y3 = y1 - p_val(w, 26); 
                    var y3_inner = y3 + p_val(w, 10);
                }
                
            }
            else if(s_count == 1){
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){
                    var y1 = y + (h/3) - p_val(w, 21.5);
                    var y1_inner = y1 + p_val(w, 9.5);  
                    var y2 = y1 - p_val(w, 13) ;
                    var y2_inner = y2 + p_val(w, 14);
                    var y3 = y1 - p_val(w, 9);
                    var y3_inner = y3 + p_val(w, 10.5);
                }
                // 21
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){
                    var y1 = y + (h/3) - p_val(w, 23.5);
                    var y1_inner = y1 + p_val(w, 10);  
                    var y2 = y1 - p_val(w, 17.5) ;
                    var y2_inner = y2 + p_val(w, 14);
                    var y3 = y1 - p_val(w, 10);
                    var y3_inner = y3 + p_val(w, 10);
                }
                // 32
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y + (h/3) - p_val(w, 38);
                    var y1_inner = y1 + p_val(w, 8);  
                    var y2 = y1 - p_val(w, 37);
                    var y2_inner = y2 + p_val(w, 18);
                    var y3 = y1 - p_val(w, 20);
                    var y3_inner = y3 + p_val(w, 14);
                }
                // 28
                else{
                    var y1 = y + (h/3) - p_val(w, 36.5);
                    var y1_inner = y1 + p_val(w, 9.5);  
                    var y2 = y1 - p_val(w, 25.5) ;
                    var y2_inner = y2 + p_val(w, 16);
                    var y3 = y1 - p_val(w, 16.5);
                    var y3_inner = y3 + p_val(w, 10.5);
                }
                
            }
            else if(s_count == 2){
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){
                    var y1 = y + p_val(w, 20);
                    var y1_inner = y1 + p_val(w, 14);  
                    var y2 = y1 - p_val(w, 10) ;
                    var y2_inner = y2 + p_val(w, 14);
                    var y3 = y1 - p_val(w, 6);
                    var y3_inner = y3 + p_val(w, 11);
                }
                // 21
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){
                    var y1 = y + p_val(w, 28);
                    var y1_inner = y1 + p_val(w, 12);  
                    var y2 = y1 - p_val(w, 12.5) ;
                    var y2_inner = y2 + p_val(w, 13);
                    var y3 = y1 - p_val(w, 10);
                    var y3_inner = y3 + p_val(w, 13);
                }
                // 32
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y + p_val(w, 37);
                    var y1_inner = y1 + p_val(w, 10);  
                    var y2 = y1 - p_val(w, 23) ;
                    var y2_inner = y2 + p_val(w, 17);
                    var y3 = y1 - p_val(w, 11);
                    var y3_inner = y3 + p_val(w, 10);
                }
                // 28
                else{
                    var y1 = y + p_val(w, 35);
                    var y1_inner = y1 + p_val(w, 12.5);  
                    var y2 = y1 - p_val(w, 18);
                    var y2_inner = y2 + p_val(w, 15.5);
                    var y3 = y1 - p_val(w, 10);
                    var y3_inner = y3 + p_val(w, 12);
                }
                    
                
            }
            else if(s_count == 3){
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){
                    var y1 = y + p_val(w, 7.5);
                    var y1_inner = y1 + p_val(w, 12);  
                    var y2 = y1 - p_val(w, 9) ;
                    var y2_inner = y2 + p_val(w, 15);
                    var y3 = y1 - p_val(w, 4.5);
                    var y3_inner = y3 + p_val(w, 11);
                }
                // 21
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){
                    var y1 = y + p_val(w, 8);
                    var y1_inner = y1 + p_val(w, 14.5);  
                    var y2 = y1 - p_val(w, 7) ;
                    var y2_inner = y2 + p_val(w, 14);
                    var y3 = y1 - p_val(w, 3);
                    var y3_inner = y3 + p_val(w, 10);
                }
                // 32
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y + p_val(w, 10);
                    var y1_inner = y1 + p_val(w, 10);  
                    var y2 = y1 - p_val(w, 11.5);
                    var y2_inner = y2 + p_val(w, 13.5);
                    var y3 = y1 - p_val(w, 7);
                    var y3_inner = y3 + p_val(w, 9);
                }
                // 28
                else{
                    var y1 = y + p_val(w, 10);
                    var y1_inner = y1 + p_val(w, 16);  
                    var y2 = y1 - p_val(w, 11);
                    var y2_inner = y2 + p_val(w, 16);
                    var y3 = y1 - p_val(w, 6.5);
                    var y3_inner = y3 + p_val(w, 12);
                }
            }
        }
        else{
            if(s_count == 0){
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){
                    var y1 = y + p_val(w, 1.5); 
                    var y1_inner = y1 + p_val(w, 13);  
                    var y2 = y1 + p_val(w, 5.5);
                    var y2_inner = y2 + p_val(w, 12);
                    var y3 = y2 - p_val(w, 4);
                    var y3_inner = y3 + p_val(w, 10);
                }
                // 21
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){
                    var y1 = y + p_val(w, 2) ; 
                    var y1_inner = y1 + p_val(w, 14);  
                    var y2 = y + p_val(w, 9);
                    var y2_inner = y2 + p_val(w, 12);
                    var y3 = y2 - p_val(w, 5);
                    var y3_inner = y3 + p_val(w, 9);
                }
                // 32
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y + p_val(w, 0.5);
                    var y1_inner = y1 + p_val(w, 14);  
                    var y2 = y + p_val(w, 12);
                    var y2_inner = y2 + p_val(w, 10);
                    var y3 = y2 - p_val(w, 8);
                    var y3_inner = y3 + p_val(w, 11);
                }
                // 28
                else{
                    var y1 = y + p_val(w, 0.5); 
                    var y1_inner = y1 + p_val(w, 15.5);  
                    var y2 = y + p_val(w, 10.5);
                    var y2_inner = y2 + p_val(w, 12.5);
                    var y3 = y2 - p_val(w, 5.5);
                    var y3_inner = y3 + p_val(w, 11);
                }
            }
            else if(s_count == 1){
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){
                    var y1 = y + p_val(w, 11) ;
                    var y1_inner = y1 + p_val(w, 13.5);  
                    var y2 = y1 + p_val(w, 11);
                    var y2_inner = y2 + p_val(w, 11);
                    var y3 = y2 - p_val(w, 6.5);
                    var y3_inner = y3 + p_val(w, 11);
                }
                // 21
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){
                    var y1 = y + p_val(w, 15) ; 
                    var y1_inner = y1 + p_val(w, 17);  
                    var y2 = y + p_val(w, 27);
                    var y2_inner = y2 + p_val(w, 13);
                    var y3 = y2 - p_val(w, 6);
                    var y3_inner = y3 + p_val(w, 11);
                }
                // 32
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y + p_val(w, 16) ;
                    var y1_inner = y1 + p_val(w, 17);  
                    var y2 = y + p_val(w, 38);
                    var y2_inner = y2 + p_val(w, 10);
                    var y3 = y2 - p_val(w, 11);
                    var y3_inner = y3 + p_val(w, 11);
                }
                // 28
                else{
                    var y1 = y + p_val(w, 14.5);
                    var y1_inner = y1 + p_val(w, 17);  
                    var y2 = y + p_val(w, 36);
                    var y2_inner = y2 + p_val(w, 12);
                    var y3 = y2 - p_val(w, 11);
                    var y3_inner = y3 + p_val(w, 11);
                }
               
            }
            else if(s_count == 2){
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){
                    var y1 = y + p_val(w, 24.5) ;
                    var y1_inner = y1 + p_val(w, 15);  
                    var y2 = y1 +  p_val(w, 13);
                    var y2_inner = y2 + p_val(w, 11);
                    var y3 = y2 - p_val(w, 8);
                    var y3_inner = y3 + p_val(w, 12);
                }
                // 21
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){
                    var y1 = y + p_val(w, 32) ;
                    var y1_inner = y1 + p_val(w, 18);  
                    var y2 = y + (h/3) - p_val(w, 23.5);
                    var y2_inner = y2 + p_val(w, 9);
                    var y3 = y2 - p_val(w, 11);
                    var y3_inner = y3 + p_val(w, 10);
                }
                // 32
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y + p_val(w, 55) ;
                    var y1_inner = y1 + p_val(w, 23);  
                    var y2 = y + (h/3) - p_val(w, 39);
                    var y2_inner = y2 + p_val(w, 9);
                    var y3 = y2 - p_val(w, 24);
                    var y3_inner = y3 + p_val(w, 13);
                }
                // 28
                else{
                    var y1 = y + p_val(w, 43);
                    var y1_inner = y1 + p_val(w, 21);  
                    var y2 = y + (h/3) - p_val(w, 35);
                    var y2_inner = y2 + p_val(w, 10);
                    var y3 = y2 - p_val(w, 19);
                    var y3_inner = y3 + p_val(w, 11);
                }
            }
            else if(s_count == 3){
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){
                    var y1 = y + (h/3) - p_val(w, 15) ;
                    var y1_inner = y1 + p_val(w, 16);  
                    var y2 = y + (h/2) - p_val(w, 22.5);
                    var y2_inner = y2 + p_val(w, 9);
                    var y3 = y2 - p_val(w, 12);
                    var y3_inner = y3 + p_val(w, 8);
                }
                // 21
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){
                    var y1 = y + (h/3) - p_val(w, 14.5) ;
                    var y1_inner = y1 + p_val(w, 20);  
                    var y2 = y + (h/2) - p_val(w, 23);
                    var y2_inner = y2 + p_val(w, 9);
                    var y3 = y2 - p_val(w, 15);
                    var y3_inner = y3 + p_val(w, 12);
                }
                // 32
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y + (h/3) - p_val(w, 15);
                    var y1_inner = y1 + p_val(w, 28);  
                    var y2 = y + (h/2) - p_val(w, 23.5);
                    var y2_inner = y2 + p_val(w, 9);
                    var y3 = y2 - p_val(w, 33);
                    var y3_inner = y3 + p_val(w, 17);
                }
                // 28
                else{
                    var y1 = y + (h/3) - p_val(w, 16);
                    var y1_inner = y1 + p_val(w, 24);  
                    var y2 = y + (h/2) - p_val(w, 22.5);
                    var y2_inner = y2 + p_val(w, 8);
                    var y3 = y2 - p_val(w, 23);
                    var y3_inner = y3 + p_val(w, 9);
                }
                
            }
        }
        var sw = p_val(w, shadow_width);

        ctx.beginPath();
        ctx.fillStyle = top_shadow;
        // ctx.fillStyle = 'red';
        ctx.strokeStyle = 'transparent';
        ctx.moveTo(x, y1);
        // ctx.lineTo(x+w, y2);
        ctx.quadraticCurveTo(x + (w/2), y3, x+w, y2);
        ctx.lineTo(x+w-sw, y2_inner);
        ctx.quadraticCurveTo(x + (w/2), y3_inner, x+sw, y1_inner);
        // ctx.lineTo(x+sw, y1_inner);
        ctx.closePath();
        ctx.fill();
    }

    function top_shadow_nb(x, y, w, top_shadow, shadow_width, h, p_count, s_count){
        if(p_count%2){
            if(s_count == 0){
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){
                    var y1 = y + (h/2) - p_val(w, 23);
                    var y1_inner = y1 + p_val(w, 7);  
                    var y2 = y1 - p_val(w, 18.5); 
                    var y2_inner = y2 + p_val(w, 10);  
                    var y3 = y1 - p_val(w, 7.5); 
                    var y3_inner = y3 + p_val(w, 6);
                }
                // 21
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){
                    var y1 = y + (h/2) - p_val(w, 21);
                    var y1_inner = y1 + p_val(w, 6);  
                    var y2 = y1 - p_val(w, 27); 
                    var y2_inner = y2 + p_val(w, 11);  
                    var y3 = y1 - p_val(w, 11); 
                    var y3_inner = y3 + p_val(w, 6);
                }
                // 32
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y + (h/2) - p_val(w, 21);
                    var y1_inner = y1 + p_val(w, 6);  
                    var y2 = y1 - p_val(w, 54); 
                    var y2_inner = y2 + p_val(w, 12);  
                    var y3 = y1 - p_val(w, 32); 
                    var y3_inner = y3 + p_val(w, 8);
                }
                // 28
                else{
                    var y1 = y + (h/2) - p_val(w, 22);
                    var y1_inner = y1 + p_val(w, 6.5);  
                    var y2 = y1 - p_val(w, 45); 
                    var y2_inner = y2 + p_val(w, 12);  
                    var y3 = y1 - p_val(w, 25); 
                    var y3_inner = y3 + p_val(w, 6);
                }
                
            }
            else if(s_count == 1){
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){
                    var y1 = y + (h/3) - p_val(w, 20);
                    var y1_inner = y1 + p_val(w, 7.5);  
                    var y2 = y1 - p_val(w, 13) ;
                    var y2_inner = y2 + p_val(w, 10);
                    var y3 = y1 - p_val(w, 8.5);
                    var y3_inner = y3 + p_val(w, 8);
                }
                // 21
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){
                    var y1 = y + (h/3) - p_val(w, 21);
                    var y1_inner = y1 + p_val(w, 7);  
                    var y2 = y1 - p_val(w, 17) ;
                    var y2_inner = y2 + p_val(w, 9);
                    var y3 = y1 - p_val(w, 10);
                    var y3_inner = y3 + p_val(w, 7);
                }
                // 32
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y + (h/3) - p_val(w, 33.5);
                    var y1_inner = y1 + p_val(w, 8);  
                    var y2 = y1 - p_val(w, 35) ;
                    var y2_inner = y2 + p_val(w, 12.5);
                    var y3 = y1 - p_val(w, 20);
                    var y3_inner = y3 + p_val(w, 7);
                }
                // 28
                else{
                    var y1 = y + (h/3) - p_val(w, 32);
                    var y1_inner = y1 + p_val(w, 7);  
                    var y2 = y1 - p_val(w, 25) ;
                    var y2_inner = y2 + p_val(w, 10);
                    var y3 = y1 - p_val(w, 14);
                    var y3_inner = y3 + p_val(w, 6);
                }
                
            }
            else if(s_count == 2){
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){
                    var y1 = y + p_val(w, 20);
                    var y1_inner = y1 + p_val(w, 8);  
                    var y2 = y1 - p_val(w, 10) ;
                    var y2_inner = y2 + p_val(w, 10);
                    var y3 = y1 - p_val(w, 6);
                    var y3_inner = y3 + p_val(w, 7);
                }
                // 21
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){
                    var y1 = y + p_val(w, 25);
                    var y1_inner = y1 + p_val(w, 8);  
                    var y2 = y1 - p_val(w, 11) ;
                    var y2_inner = y2 + p_val(w, 9);
                    var y3 = y1 - p_val(w, 9);
                    var y3_inner = y3 + p_val(w, 7);
                }
                // 32
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y + p_val(w, 33);
                    var y1_inner = y1 + p_val(w, 8);  
                    var y2 = y1 - p_val(w, 20) ;
                    var y2_inner = y2 + p_val(w, 11);
                    var y3 = y1 - p_val(w, 9);
                    var y3_inner = y3 + p_val(w, 6);
                }
                // 28
                else{
                    var y1 = y + p_val(w, 30);
                    var y1_inner = y1 + p_val(w, 8);  
                    var y2 = y1 - p_val(w, 20) ;
                    var y2_inner = y2 + p_val(w, 12);
                    var y3 = y1 - p_val(w, 10);
                    var y3_inner = y3 + p_val(w, 5);
                }
                    
                
            }
            else if(s_count == 3){
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){
                    var y1 = y + p_val(w, 7.5);
                    var y1_inner = y1 + p_val(w, 8);  
                    var y2 = y1 - p_val(w, 9) ;
                    var y2_inner = y2 + p_val(w, 10);
                    var y3 = y1 - p_val(w, 4.5);
                    var y3_inner = y3 + p_val(w, 6);
                }
                // 21
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){
                    var y1 = y + p_val(w, 8);
                    var y1_inner = y1 + p_val(w, 8);  
                    var y2 = y1 - p_val(w, 7) ;
                    var y2_inner = y2 + p_val(w, 9);
                    var y3 = y1 - p_val(w, 4);
                    var y3_inner = y3 + p_val(w, 6);
                }
                // 32
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y + p_val(w, 9.5);
                    var y1_inner = y1 + p_val(w, 7.5);  
                    var y2 = y1 - p_val(w, 10) ;
                    var y2_inner = y2 + p_val(w, 9.5);
                    var y3 = y1 - p_val(w, 6);
                    var y3_inner = y3 + p_val(w, 6);
                }
                // 28
                else{
                    var y1 = y + p_val(w, 10);
                    var y1_inner = y1 + p_val(w, 7);  
                    var y2 = y1 - p_val(w, 11) ;
                    var y2_inner = y2 + p_val(w, 8);
                    var y3 = y1 - p_val(w, 4);
                    var y3_inner = y3 + p_val(w, 5);
                }
            }
        }
        else{
            if(s_count == 0){
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){
                    var y1 = y + p_val(w, 1.5); 
                    var y1_inner = y1 + p_val(w, 8);  
                    var y2 = y1 + p_val(w, 5.5);
                    var y2_inner = y2 + p_val(w, 8);
                    var y3 = y2 - p_val(w, 4);
                    var y3_inner = y3 + p_val(w, 6.5);
                }
                // 21
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){
                    var y1 = y + p_val(w, 2) ; 
                    var y1_inner = y1 + p_val(w, 8);  
                    var y2 = y + p_val(w, 8);
                    var y2_inner = y2 + p_val(w, 7.5);
                    var y3 = y2 - p_val(w, 4);
                    var y3_inner = y3 + p_val(w, 5);
                }
                // 32
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y ; 
                    var y1_inner = y1 + p_val(w, 9);  
                    var y2 = y + p_val(w, 10);
                    var y2_inner = y2 + p_val(w, 8);
                    var y3 = y2 - p_val(w, 5.5);
                    var y3_inner = y3 + p_val(w, 5.5);
                }
                // 28
                else{
                    var y1 = y ; 
                    var y1_inner = y1 + p_val(w, 8);  
                    var y2 = y + p_val(w, 10);
                    var y2_inner = y2 + p_val(w, 8);
                    var y3 = y2 - p_val(w, 4);
                    var y3_inner = y3 + p_val(w, 6);
                }
            }
            else if(s_count == 1){
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){
                    var y1 = y + p_val(w, 9) ;
                    var y1_inner = y1 + p_val(w, 10);  
                    var y2 = y1 + p_val(w, 10);
                    var y2_inner = y2 + p_val(w, 8);
                    var y3 = y2 - p_val(w, 6.5);
                    var y3_inner = y3 + p_val(w, 7.5);
                }
                // 21
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){
                    var y1 = y + p_val(w, 12) ; 
                    var y1_inner = y1 + p_val(w, 8.5);  
                    var y2 = y + p_val(w, 22);
                    var y2_inner = y2 + p_val(w, 8);
                    var y3 = y2 - p_val(w, 4.5);
                    var y3_inner = y3 + p_val(w, 6);
                }
                // 32
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y + p_val(w, 13.5) ;
                    var y1_inner = y1 + p_val(w, 11);  
                    var y2 = y + p_val(w, 33.5);
                    var y2_inner = y2 + p_val(w, 8);
                    var y3 = y2 - p_val(w, 10);
                    var y3_inner = y3 + p_val(w, 6);
                }
                // 28
                else{
                    var y1 = y + p_val(w, 12) ;
                    var y1_inner = y1 + p_val(w, 11);  
                    var y2 = y + p_val(w, 32);
                    var y2_inner = y2 + p_val(w, 8);
                    var y3 = y2 - p_val(w, 10);
                    var y3_inner = y3 + p_val(w, 5);
                }
               
            }
            else if(s_count == 2){
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){
                    var y1 = y + p_val(w, 22.5) ;
                    var y1_inner = y1 + p_val(w, 9.5);  
                    var y2 = y1 +  p_val(w, 13);
                    var y2_inner = y2 + p_val(w, 8);
                    var y3 = y2 - p_val(w, 8);
                    var y3_inner = y3 + p_val(w, 7);
                }
                // 21
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){
                    var y1 = y + p_val(w, 28) ;
                    var y1_inner = y1 + p_val(w, 9.5);  
                    var y2 = y + (h/3) - p_val(w, 23);
                    var y2_inner = y2 + p_val(w, 8);
                    var y3 = y2 - p_val(w, 7);
                    var y3_inner = y3 + p_val(w, 6);
                }
                // 32
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y + p_val(w, 44) ;
                    var y1_inner = y1 + p_val(w, 13);  
                    var y2 = y + (h/3) - p_val(w, 36);
                    var y2_inner = y2 + p_val(w, 8);
                    var y3 = y2 - p_val(w, 20);
                    var y3_inner = y3 + p_val(w, 7);
                }
                // 28
                else{
                    var y1 = y + p_val(w, 37) ;
                    var y1_inner = y1 + p_val(w, 10);  
                    var y2 = y + (h/3) - p_val(w, 32);
                    var y2_inner = y2 + p_val(w, 8);
                    var y3 = y2 - p_val(w, 15);
                    var y3_inner = y3 + p_val(w, 5);
                }
            }
            else if(s_count == 3){
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){
                    var y1 = y + (h/3) - p_val(w, 15) ;
                    var y1_inner = y1 + p_val(w, 11);  
                    var y2 = y + (h/2) - p_val(w, 22);
                    var y2_inner = y2 + p_val(w, 7);
                    var y3 = y2 - p_val(w, 12);
                    var y3_inner = y3 + p_val(w, 8);
                }
                // 21
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){
                    var y1 = y + (h/3) - p_val(w, 14) ;
                    var y1_inner = y1 + p_val(w, 10);  
                    var y2 = y + (h/2) - p_val(w, 22);
                    var y2_inner = y2 + p_val(w, 7);
                    var y3 = y2 - p_val(w, 15);
                    var y3_inner = y3 + p_val(w, 7);
                }
                // 32
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y + (h/3) - p_val(w, 18.5) ;
                    var y1_inner = y1 + p_val(w, 15);  
                    var y2 = y + (h/2) - p_val(w, 23);
                    var y2_inner = y2 + p_val(w, 8);
                    var y3 = y2 - p_val(w, 30);
                    var y3_inner = y3 + p_val(w, 7);
                }
                // 28
                else{
                    var y1 = y + (h/3) - p_val(w, 17) ;
                    var y1_inner = y1 + p_val(w, 12);  
                    var y2 = y + (h/2) - p_val(w, 22);
                    var y2_inner = y2 + p_val(w, 8);
                    var y3 = y2 - p_val(w, 20);
                    var y3_inner = y3 + p_val(w, 5);
                }
                
            }
        }
        var sw = p_val(w, shadow_width);

        ctx.beginPath();
        ctx.fillStyle = top_shadow;

        ctx.strokeStyle = 'transparent';
        ctx.moveTo(x, y1);
        // ctx.lineTo(x+w, y2);
        ctx.quadraticCurveTo(x + (w/2), y3, x+w, y2);
        ctx.lineTo(x+w-sw, y2_inner);
        ctx.quadraticCurveTo(x + (w/2), y3_inner, x+sw, y1_inner);
        // ctx.lineTo(x+sw, y1_inner);
        ctx.closePath();
        ctx.fill();
    }

    function left_shadow_nb_inner(x, y, h, l_shadow, w, shadow_width, p_count, s_count){  
        if(p_count%2){
            if(s_count == 0){
                var y1 = y + (h/2) - p_val(w, 19);
                var y3 = y1 + p_val(w, 3);
            }
            else if(s_count == 1){
                // 18
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){
                    var y1 = y + (h/3) - p_val(w, 19);
                    var y3 = y1 + p_val(w, 3);
                }
                // 21
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){
                    var y1 = y + (h/3) - p_val(w, 21);
                    var y3 = y1 + p_val(w, shadow_width-0.5);
                }
                // 32
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y + (h/3) - p_val(w, 32.5);
                    var y3 = y1 + p_val(w, 5);
                }
                // 28
                else{
                    var y1 = y + (h/3) - p_val(w, 33);
                    var y3 = y1 + p_val(w, shadow_width-2);                    
                }
            }
            else if(s_count == 2){
                // 18
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){
                    var y1 = y + p_val(w, 18);
                    var y3 = y1 + p_val(w, shadow_width-2);
                }
                // 21
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){
                    var y1 = y + p_val(w, 25);
                    var y3 = y1 + p_val(w, shadow_width-1.5);
                }
                //  // 32
                 else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y + p_val(w, 33.5);
                    var y3 = y1 + p_val(w, shadow_width-2);
                 }
                else{                
                    var y1 = y + p_val(w, 32);
                    var y3 = y1 + p_val(w, shadow_width-2);
                }
            }
            else if(s_count == 3){
                // 18
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){
                    var y1 = y + p_val(w, 6.5);
                    var y3 = y1 + p_val(w, shadow_width-1);
                }
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){
                    var y1 = y + p_val(w, 7.5);
                    var y3 = y1 + p_val(w, shadow_width-0.5);
                }   
                    // 32
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y + p_val(w, 10);
                    var y3 = y1 + p_val(w, 5);
                }
                else{
                    var y1 = y + p_val(w, 10);
                    var y3 = y1 + p_val(w, shadow_width-1);
                }
            }
        }
        else{
            if(s_count == 0){
                // 18
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){
                    var y1 = y ; 
                    var y3 = y1 + p_val(w, shadow_width-1);
                }
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){
                    var y1 = y + p_val(w, 1) ;
                    var y3 = y1 + p_val(w, shadow_width-0.5);
                }
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y + p_val(w, 1) ;
                    var y3 = y1 + p_val(w, shadow_width);
                }
                else{
                    var y1 = y ;
                    var y3 = y1 + p_val(w, shadow_width);
                }
            }
            else if(s_count == 1){
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){
                    var y1 = y + p_val(w, 10) ;
                    var y3 = y1 + p_val(w, shadow_width-1);
                }
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){
                    var y1 = y + p_val(w, 12) ;
                    var y3 = y1 + p_val(w, shadow_width);
                }
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y + p_val(w, 17);
                    var y3 = y1 + p_val(w, 15);
                }
                else{
                    var y1 = y + p_val(w, 12) ;
                    var y3 = y1 + p_val(w, shadow_width);
                }
                
            }
            else if(s_count == 2){
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){
                    var y1 = y + p_val(w, 23) ;
                    var y3 = y1 + p_val(w, shadow_width);
                }
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){
                    var y1 = y + p_val(w, 30) ;
                    var y3 = y1 + p_val(w, shadow_width-0.5);
                }
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y + p_val(w, 52) ;
                    var y3 = y1 + p_val(w, 18);
                }
                else{
                    var y1 = y + p_val(w, 37) ;
                    var y3 = y1 + p_val(w, shadow_width);
                }
                
            }
            else if(s_count == 3){
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){
                    var y1 = y + (h/3) - p_val(w, 10) ;
                    var y3 = y1 + p_val(w, shadow_width-1);
                }
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){
                   var y1 = y + (h/3) - p_val(w, 8) ;
                   var y3 = y1 + p_val(w, shadow_width);
                }
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y + (h/3) - p_val(w, 9.5) ;
                    var y3 = y1 + p_val(w, 20);
                }
                else{
                    var y1 = y + (h/3) - p_val(w, 12);
                    var y3 = y1 + p_val(w, shadow_width-1);
                }
                
            }
        }

        var y2 = y + h;
        var sw = p_val(w, shadow_width);

        ctx.beginPath();
        ctx.fillStyle = l_shadow;
        ctx.strokeStyle = 'transparent';
        ctx.moveTo(x, y1);
        ctx.lineTo(x+sw, y3);
        ctx.lineTo(x+sw, y2-sw);
        ctx.lineTo(x, y2);
        ctx.lineTo(x, y1);
        ctx.closePath();
        ctx.fill();
    }


    function left_shadow_nb(x, y, h, l_shadow, w, shadow_width, p_count, s_count){  
        if(p_count%2){
            if(s_count == 0){
                var y1 = y + (h/2) - p_val(w, 23);
            }
            else if(s_count == 1){
                // 18
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){
                    var y1 = y + (h/3) - p_val(w, 21);
                }
                // 21
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){
                    var y1 = y + (h/3) - p_val(w, 24);
                }
                // 32
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y + (h/3) - p_val(w, 34.5);
                }
                // 28
                else{
                    var y1 = y + (h/3) - p_val(w, 33);
                }
            }
            else if(s_count == 2){
                // 18
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){
                    var y1 = y + p_val(w, 20);
                }
                // 21
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){
                    var y1 = y + p_val(w, 25);
                }
                //  // 32
                //  else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){

                //  }
                else{                
                    var y1 = y + p_val(w, 32);
                }
            }
            else if(s_count == 3){
                // 18
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){
                    var y1 = y + p_val(w, 7);
                }
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){
                    var y1 = y + p_val(w, 8);
                }   
                    // 32
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y + p_val(w, 10);
                }
                else{
                    var y1 = y + p_val(w, 10);
                }
            }
        }
        else{
            if(s_count == 0){
                // 18
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){
                    var y1 = y ; 
                }
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){
                    var y1 = y ;
                }
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y ;
                }
                else{
                    var y1 = y ;
                }
            }
            else if(s_count == 1){
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){
                    var y1 = y + p_val(w, 9) ;
                }
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){
                    var y1 = y + p_val(w, 10) ;
                }
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y + p_val(w, 13);
                }
                else{
                    var y1 = y + p_val(w, 12) ;
                }
                
            }
            else if(s_count == 2){
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){
                    var y1 = y + p_val(w, 24) ;
                }
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){
                    var y1 = y + p_val(w, 28.5) ;
                }
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y + p_val(w, 42) ;
                }
                else{
                    var y1 = y + p_val(w, 37) ;
                }
                
            }
            else if(s_count == 3){
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){
                    var y1 = y + (h/3) - p_val(w, 14) ;
                }
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){
                   var y1 = y + (h/3) - p_val(w, 15) ;
                }
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y + (h/3) - p_val(w, 17.5) ;
                }
                else{
                    var y1 = y + (h/3) - p_val(w, 15) ;
                }
                
            }
        }

        var y2 = y + h;
        var sw = p_val(w, shadow_width);

        ctx.beginPath();
        ctx.fillStyle = l_shadow;
        ctx.strokeStyle = 'transparent';
        ctx.moveTo(x, y1);
        ctx.lineTo(x+sw, y1+sw);
        ctx.lineTo(x+sw, y2-sw);
        ctx.lineTo(x, y2);
        ctx.lineTo(x, y1);
        ctx.closePath();
        ctx.fill();
    }

    function left_shadow_arched(x, y, ly, l_shadow, w, shadow_width, ps, pairs){  
        if(pairs%2){
            if(ps==0){ 
                var y1 = y + p_val(w, 49);
                var y2 = y1 + p_val(w, 2);
            }
            else{
                var y1 = y + p_val(w, 5);
                var y2 = y1 + p_val(w, 4);
            }
        }
        else{
            if(ps==1){ 
                var y1 = y + p_val(w, 8);
                var y2 = y1 + p_val(w, 6);
            }
            else{
                var y1 = y;
                var y2 = y1 + p_val(w, 4);
            }
        }
        var sw = p_val(w, shadow_width);
        
        ctx.beginPath();
        ctx.fillStyle = l_shadow;
        ctx.strokeStyle = 'transparent';
        ctx.moveTo(x, y1);
        ctx.lineTo(x + sw, y2);
        ctx.lineTo(x + sw, ly-sw);
        ctx.lineTo(x, ly);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.fill();
    }

    function right_shadow_arched(x, y, h, right_shadow, w, shadow_width, pairs){   
        if(pairs%2){
            if(ps==0){ 
                var y1 = y + p_val(w, 8);
                var y2 = y1 + p_val(w, 6);
            }
            else{
                var y1 = y ;
                var y2 = y1 + p_val(w, 4);
            } 
        }
        else{            
            if(ps==1){ 
                var y1 = y + p_val(w, 49);
                var y2 = y1 + p_val(w, 2);
            }
            else{
                var y1 = y + p_val(w, 5);
                var y2 = y1 + p_val(w, 4);
            } 
        }
        var sw = p_val(w, shadow_width);
        ctx.beginPath();
        ctx.fillStyle = right_shadow;
        ctx.moveTo(x, y1);
        ctx.lineTo(x, y+h);
        ctx.lineTo(x-sw, y+h-sw);
        ctx.lineTo(x-sw, y2);
        ctx.closePath();
        ctx.fill();
    }
    
    function right_shadow_nb(x, y, h, right_shadow, w, shadow_width, p_count, s_count){  
        if(p_count%2){
            if(s_count == 0){
                var y1 = y + (h/3) - p_val(w, 15);
            }
            else if(s_count == 1){
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){
                    var y1 = y + p_val(w, 25) ;
                }
                // 21
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){
                    var y1 = y + p_val(w, 30) ;
                }
                // 32
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y + p_val(w, 43) ;
                }
                // 28
                else{
                    var y1 = y + p_val(w, 39) ;
                }
            }
            else if(s_count == 2){
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){
                    var y1 = y + p_val(w, 10) ;
                }
                // 21
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){
                    var y1 = y + p_val(w, 12) ;
                }
                // 32
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y + p_val(w, 13) ;
                }
                // 28
                else{
                    var y1 = y + p_val(w, 12) ;
                }
            }
            else if(s_count == 3){
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){
                    var y1 = y ;
                }
                // 21
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){
                    var y1 = y ;
                }
                // 32
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y + p_val(w, 0.5);
                }
                // 28
                else{
                   var y1 = y ;
                }
                
            }
        }  
        else{
            if(s_count == 0){
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){
                    var y1 = y + p_val(w, 8);
                }
                // 21
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){
                    var y1 = y + p_val(w, 8);
                }
                // 32
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y + p_val(w, 10);
                }
                // 28
                else{
                   var y1 = y + p_val(w, 9.5);
                }
                
            }
            else if(s_count == 1){
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){                    
                    var y1 = y + p_val(w, 21);
                }
                // 21
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){                    
                    var y1 = y + p_val(w, 25);
                }
                // 32
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y + p_val(w, 33);
                }
                // 28
                else{
                    var y1 = y + p_val(w, 32);
                }
            }
            else if(s_count == 2){
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){                    
                    var y1 = y + (h/3) - p_val(w, 22);
                }
                // 21
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){                    
                    var y1 = y + (h/3) - p_val(w, 25);
                }
                // 32
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                    var y1 = y + (h/3) - p_val(w, 34.5);
                }
                // 28
                else{
                    var y1 = y + (h/3) - p_val(w, 32);
                }
                
            }
            else if(s_count == 3){
                if(h_ft=="06' 02" || h_ft=="06' 06" || h_ft=="06' 10" || h_ft=="08' 06" || h_ft=="08' 10" || h_ft=="09' 02" || h_ft=="09' 06" || h_ft=="10' 10" || h_ft=="13' 02" || h_ft=="11' 02" || h_ft=="11' 06" || h_ft=="11' 10" || h_ft=="12' 02"){                    
                    var y1 = y + (h/2) - p_val(w, 21);
                }
                // 21
                else if(h_ft=="06' 05" || h_ft=="06' 09" || h_ft=="07' 01" || h_ft=="08' 09" || h_ft=="09' 01" || h_ft=="09' 05" || h_ft=="09' 09" || h_ft=="11' 01" || h_ft=="13' 05" || h_ft=="12' 05" || h_ft=="11' 05" || h_ft=="11' 09" || h_ft=="12' 01"){                    
                    var y1 = y + (h/2) - p_val(w, 21);
                }
                // 32
                else if(h_ft=="07' 04" || h_ft == "08' 00" || h_ft=="10' 08" || h_ft=="13' 04" || h_ft=="13' 06"){
                   var y1 = y + (h/2) - p_val(w, 21);
                }
                // 28
                else{
                   var y1 = y + (h/2) - p_val(w, 21);
                }
                
            }
        }
        var sw = p_val(w, shadow_width);

        ctx.beginPath();
        ctx.fillStyle = right_shadow;
        ctx.moveTo(x, y1);
        ctx.lineTo(x, y+h);
        ctx.lineTo(x-sw, y+h-sw);
        ctx.lineTo(x-sw, y1+sw);
        ctx.closePath();
        ctx.fill();
    }


    function right_shadow(x, y, h, right_shadow, w, shadow_width){    
        var sw = p_val(w, shadow_width);
        ctx.beginPath();
        ctx.fillStyle = right_shadow;
        ctx.moveTo(x, y);
        ctx.lineTo(x, y+h);
        ctx.lineTo(x-sw, y+h-sw);
        ctx.lineTo(x-sw, y+sw);
        ctx.closePath();
        ctx.fill();
    }

    function bottom_shadow(x, y, w, h, b_shadow, shadow_width){   
        var sw = p_val(w, shadow_width);
        ctx.beginPath();
        ctx.fillStyle = b_shadow;
        ctx.moveTo(x+sw,y+h-sw);
        ctx.lineTo(x+w-sw, y+h-sw);
        ctx.lineTo(x+w, y+h);
        ctx.lineTo(x, y+h);
        ctx.closePath();                
        ctx.fill();
    }

    function divider_left(x, lx, y, w, h, l_shadow, d_shade){ 
        ctx.beginPath();
        ctx.fillStyle = d_shade[2];
        ctx.strokeStyle = 'transparent';
        ctx.moveTo(x, y);
        ctx.lineTo(x, y+h);
        ctx.lineTo(lx, y+h+p_val(w, 3));
        ctx.lineTo(lx, y-p_val(w, 3));
        ctx.fill();
    }
    function divider_right(x, lx, y, w, h, l_shadow, d_shade){
        ctx.beginPath();
        ctx.fillStyle = l_shadow[2];
        ctx.strokeStyle = 'transparent';
        ctx.moveTo(x, y-p_val(w, 3));
        ctx.lineTo(x, y+h+p_val(w, 3));
        ctx.lineTo(lx, y+h);
        ctx.lineTo(lx, y);
        ctx.fill();
    }

    function divider_left_arched(x, lx, y_pos, y, w, h, l_shadow, d_shade, ps, pairs){ 
        
        ctx.beginPath();
        ctx.fillStyle = d_shade[2];
        // ctx.fillStyle = 'red';
        ctx.strokeStyle = 'transparent';
        ctx.moveTo(x, y_pos);
        ctx.lineTo(x, (+y)+(+h));
        ctx.lineTo(lx, (+y)+(+h)+(+p_val(w, 3)));
        ctx.lineTo(lx, (+y_pos)-(+p_val(w, 3)));
        ctx.fill();
    }
    function divider_right_arched(x, lx, y_pos, y, w, h, l_shadow, d_shade){
        ctx.beginPath();
        ctx.fillStyle = l_shadow[2];
        // ctx.fillStyle = 'green';
        ctx.strokeStyle = 'transparent';
        ctx.moveTo(x, (+y_pos)-(+p_val(w, 3)));
        ctx.lineTo(x, (+y)+(+h)+(+p_val(w, 3)));
        ctx.lineTo(lx, (+y)+(+h));
        ctx.lineTo(lx, y_pos);
        ctx.fill();
    }
    
    function beadboard_area(x, y, w, h, l_shadow, d_shade){
        var bb_count = 0;
        if(selectedPanel == 'Tuscany' || selectedPanel == 'Lucern' || selectedPanel == 'Santiago' || selectedPanel == 'Valencia'){
            bb_count = 5;
        }
        else if(selectedPanel == 'Cortana'){
            bb_count = 8;
        }
        
        ctx.strokeStyle = 'transparent';
        ctx.strokeRect(x, y, w, h);
        ctx.stroke();
        
        
        var x_pos = (+x) + (w/bb_count)-p_val(w,2);
        if(selectedPanel == 'Tuscany' || selectedPanel == 'Lucern' || selectedPanel == 'Santiago' || selectedPanel == 'Valencia'){
            for(i = 1; i<bb_count; i++){  
                divider_left(x_pos, x_pos + p_val(w,2), y, w, h, l_shadow, d_shade);
                divider_right(x_pos + p_val(w,2), x_pos + p_val(w,4), y, w, h, l_shadow, d_shade);
                x_pos = x_pos + (w/bb_count) + p_val(w, 1);
            }
        }
        else if(selectedPanel == 'Cortana'){
            for(i = 1; i<bb_count; i++){  
                divider_left(x_pos, x_pos + p_val(w,1), y + p_val(w,1), w, h-p_val(w,2), l_shadow, d_shade);
                divider_right(x_pos + p_val(w,1), x_pos + p_val(w,2), y + p_val(w,1), w, h-p_val(w,2), l_shadow, d_shade);
                x_pos = x_pos + (w/bb_count) + p_val(w, 0.5);
            }
        }
        
    }

    function beadboard_area_arched(x, y, w, h, l_shadow, d_shade, ps, pairs){
        var bb_count = 5;
        
        
        ctx.strokeStyle = 'transparent';
        ctx.strokeRect(x, y, w, h);
        ctx.stroke();
        
        
        var x_pos = (+x) + (w/bb_count)-p_val(w,2);
        for(i = 1; i<bb_count; i++){ 
            if(pairs%2){
                if(ps == 0){
                    var y_pos = y + p_val(w, (49.5 - (i * 8)));
                }
                else{
                    var y_pos = y + p_val(w, (5 - (i * 1.3)));
                }
            } 
            else{
                if(ps == 0){
                    var y_pos = y + p_val(w, (i * 1.2));
                }
                else{
                    var y_pos = y + p_val(w, (9.5 + (i * 8)));
                }
            }
            divider_left_arched(x_pos, x_pos + p_val(w,2), y_pos, y, w, h, l_shadow, d_shade, ps, pairs);
            divider_right_arched(x_pos + p_val(w,2), x_pos + p_val(w,4), y_pos, y, w, h, l_shadow, d_shade, ps, pairs);
            x_pos = x_pos + (w/bb_count) + p_val(w, 1);
        }
        
    }

    function beadboard_base_arched(x, y, w, h, l_shadow, d_shade, ps, pairs){
        var s_width = 0;
        
        if(selectedPanel == 'Tuscany' || selectedPanel == 'Lucern' || selectedPanel == 'Santiago' || selectedPanel == 'Valencia' || selectedPanel == 'Cortana'){
            s_width = 4;
        }


        left_shadow_arched(x+p_val(w, 0.5), y, y+h, l_shadow[1], w, s_width, ps, pairs);
        top_shadow_arched(x+p_val(w, 0.5), y, w, l_shadow[0], s_width, pairs);
        right_shadow_arched((+x) + (+w), y, h, d_shade[1], w, s_width, pairs);
        bottom_shadow(x, y,w, h, d_shade[0],s_width);

        if(selectedPanel == 'Tuscany' || selectedPanel == 'Lucern' || selectedPanel == 'Santiago' || selectedPanel == 'Valencia' || selectedPanel == 'Cortana'){
            beadboard_area_arched(x+p_val(w, 4), y+p_val(w, 4), w-p_val(w, 9), h-p_val(w, 9), l_shadow, d_shade, ps, pairs);
        }
    }


    function beadboard_base_nb(stamp_x, stamp_y,stamp_w, stamp_h, l_shadow, d_shade, s_count, p_count, s){
        var w = stamp_w;
        var s_width = 0;
        if(selectedPanel == 'Bordeaux'){
            s_width = 16;
            left_shadow_nb_inner(stamp_x+4, stamp_y + 3.5, stamp_h - 4, l_shadow[1], stamp_w, s_width, p_count, s);            
            right_shadow_nb((+stamp_x)+(+stamp_w) - 3, stamp_y + 3.5, stamp_h - 6, d_shade[1], stamp_w, s_width, p_count, s);
            top_shadow_nb_inner(stamp_x+4, stamp_y+3.5, stamp_w - 7, l_shadow[0], s_width, stamp_h, p_count, s);
            bottom_shadow(stamp_x + 4, stamp_y-3, stamp_w -7, stamp_h, d_shade[0], s_width);
        }        
    }

    function beadboard_base(stamp_x, stamp_y,stamp_w, stamp_h, l_shadow, d_shade, s_count){
        var w = stamp_w;
        var s_width = 0;
        if(selectedPanel == 'Bordeaux'){
            s_width = 16;
            left_shadow(stamp_x+4, stamp_y + 3.5, (+stamp_y)+(+stamp_h) - 4, l_shadow[1], stamp_w, s_width);
            top_shadow(stamp_x+4, stamp_y+3.5, stamp_w - 7, l_shadow[0], s_width);
            right_shadow((+stamp_x)+(+stamp_w) - 3, stamp_y + 3.5, stamp_h - 6, d_shade[1], stamp_w, s_width);
            bottom_shadow(stamp_x + 4, stamp_y-3, stamp_w -7, stamp_h, d_shade[0], s_width);
        }
        else{
            if(selectedPanel == 'Tuscany' || selectedPanel == 'Lucern' || selectedPanel == 'Santiago' || selectedPanel == 'Valencia'){
                s_width = 4;
            }
            else if(selectedPanel == 'Cortana'){
                s_width = 1.4;
            }
            left_shadow(stamp_x+p_val(w, 0.5), stamp_y, stamp_y+stamp_h, l_shadow[1], stamp_w, s_width);
            top_shadow(stamp_x+p_val(w, 0.5), stamp_y, stamp_w, l_shadow[0], s_width);
            right_shadow(stamp_x+stamp_w, stamp_y, stamp_h, d_shade[1], stamp_w, s_width);
            bottom_shadow(stamp_x, stamp_y,stamp_w, stamp_h, d_shade[0],s_width);
        }

        if(selectedPanel == 'Tuscany' || selectedPanel == 'Lucern' || selectedPanel == 'Santiago' || selectedPanel == 'Valencia'){
            beadboard_area(stamp_x+p_val(w, 4), stamp_y+p_val(w, 4), stamp_w-p_val(w, 9), stamp_h-p_val(w, 9), l_shadow, d_shade);
        }
        else if(selectedPanel == 'Cortana'){
            beadboard_area(stamp_x+p_val(w, 2), stamp_y+p_val(w, 1.7), stamp_w-p_val(w, 4), stamp_h-p_val(w, 4), l_shadow, d_shade);
        }
    }

    function stamp_shadow_nb(stamp_x, stamp_y, stamp_w, stamp_h, l_shadow, d_shades, p_count, s_count, s){
        var s_width = 0;
        
        s_width = 8;
        left_shadow_nb(stamp_x+p_val(stamp_w, 0.5), stamp_y, stamp_h, d_shades[2], stamp_w, s_width, p_count, s);        
        right_shadow_nb(stamp_x+stamp_w, stamp_y, stamp_h, l_shadow[2], stamp_w, s_width, p_count, s);
        top_shadow_nb(stamp_x+p_val(stamp_w, 0.5), stamp_y, stamp_w, d_shades[1], s_width, stamp_h, p_count, s);
        bottom_shadow(stamp_x, stamp_y,stamp_w, stamp_h, l_shadow[1], s_width);

        if(selectedPanel == 'Bordeaux'){
            beadboard_base_nb(stamp_x+p_val(stamp_w, 3.25), stamp_y+p_val(stamp_w, 3.25), stamp_w-p_val(stamp_w, 6.5), stamp_h-p_val(stamp_w, 6.5), l_shadow, d_shades, s_count, p_count, s);
        }
    }

    

    function stamp_shadow(stamp_x, stamp_y, stamp_w, stamp_h, l_shadow, d_shades, s_count){
        var s_width = 0;
        if(selectedPanel == 'Tuscany'){
            s_width = 4;
            left_shadow(stamp_x+p_val(stamp_w, 0.37), stamp_y, stamp_y+stamp_h, d_shades[2], stamp_w, s_width);
            top_shadow(stamp_x+p_val(stamp_w, 0.37), stamp_y, stamp_w, d_shades[1], s_width);
            right_shadow(stamp_x+stamp_w, stamp_y, stamp_h, l_shadow[2], stamp_w, s_width);
            bottom_shadow(stamp_x, stamp_y,stamp_w, stamp_h, l_shadow[1], s_width);
        }
        else if(selectedPanel == 'Cortana'){
            s_width = 1.4;            
            left_shadow(stamp_x + p_val(stamp_w, 0.17), (+stamp_y), (+stamp_y)+(+stamp_h)-2, d_shades[2], stamp_w, s_width);
            top_shadow((+stamp_x) + p_val(stamp_w, 0.17), (+stamp_y), (+stamp_w), d_shades[1], s_width);
            right_shadow((+stamp_x) + (+stamp_w) - 2, stamp_y, stamp_h, l_shadow[2], stamp_w, s_width);
            bottom_shadow((+stamp_x), (+stamp_y)-2, (+stamp_w), (+stamp_h), l_shadow[1], s_width);
        }
        else{
            s_width = 8;
            left_shadow(stamp_x+p_val(stamp_w, 0.5), stamp_y, stamp_y+stamp_h, d_shades[2], stamp_w, s_width);
            top_shadow(stamp_x+p_val(stamp_w, 0.5), stamp_y, stamp_w, d_shades[1], s_width);
            right_shadow(stamp_x+stamp_w, stamp_y, stamp_h, l_shadow[2], stamp_w, s_width);
            bottom_shadow(stamp_x, stamp_y,stamp_w, stamp_h, l_shadow[1], s_width);
        }

        if(selectedPanel == 'Tuscany' || selectedPanel == 'Bordeaux'){
            beadboard_base(stamp_x+p_val(stamp_w, 3.25), stamp_y+p_val(stamp_w, 3.25), stamp_w-p_val(stamp_w, 6.5), stamp_h-p_val(stamp_w, 6.5), l_shadow, d_shades, s_count);
        }
        else if(selectedPanel == 'Cortana' ){
            beadboard_base(stamp_x+p_val(stamp_w, 1.5), stamp_y+p_val(stamp_w, 1.5), stamp_w-p_val(stamp_w, 4), stamp_h-p_val(stamp_w, 4), l_shadow, d_shades, s_count);
        }
    }

    function stamp_shadow_t(stamp_x, stamp_y, stamp_w, stamp_h, l_shadow, d_shades, s_count, pair_count){
        var s_width = 4
        left_shadow(stamp_x+p_val(stamp_w, 0.37), stamp_y, stamp_y+stamp_h, d_shades[2], stamp_w, s_width);
        top_shadow(stamp_x+p_val(stamp_w, 0.37), stamp_y, stamp_w, d_shades[1], s_width);
        right_shadow(stamp_x+stamp_w, stamp_y, stamp_h, l_shadow[2], stamp_w, s_width);
        bottom_shadow(stamp_x, stamp_y,stamp_w, stamp_h, l_shadow[1], s_width);

        beadboard_base(stamp_x+p_val(stamp_w, 3.25), stamp_y+p_val(stamp_w, 3.25),stamp_w-p_val(stamp_w, 6.5), stamp_h-p_val(stamp_w, 6.5), l_shadow, d_shades, s_count);
        
    }

    
    function diagonal_shadow_left(x, y, w, h, l_shade, d_shade){
        ctx.beginPath();
        ctx.fillStyle = l_shade[1];
        // ctx.fillStyle = 'green';
        ctx.moveTo(x+w-p_val(w, 18), y);
        ctx.lineTo(x, y+h-p_val(w, 18));
        ctx.lineTo(x+p_val(w, 4), y+h-p_val(w, 27));
        ctx.lineTo(x+w-p_val(w, 25), y+p_val(w, 4));
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = d_shade[1];
        // ctx.fillStyle = 'blue';
        ctx.moveTo(x+w, y+p_val(w, 18));
        ctx.lineTo(x+p_val(w, 18), y+h);
        ctx.lineTo(x+p_val(w, 24), y+h-p_val(w, 4));
        ctx.lineTo(x+w-p_val(w, 4), y+p_val(w, 29));
        ctx.fill();
    }

    function diagonal_shadow_right(x, y, w, h, l_shade, d_shade){
        ctx.beginPath();
        ctx.fillStyle = d_shade[1];
        ctx.moveTo(x+p_val(w, 18), y);
        ctx.lineTo(x+w, y+h-p_val(w, 18));
        ctx.lineTo(x+w-p_val(w, 4), y+h-p_val(w, 27));
        ctx.lineTo(x+p_val(w, 25), y+p_val(w, 4));
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = l_shade[1];
        ctx.moveTo(x, y+p_val(w, 18));
        ctx.lineTo(x+w-p_val(w, 18), y+h);
        ctx.lineTo(x+w-p_val(w, 24), y+h-p_val(w, 4));
        ctx.lineTo(x+p_val(w, 4), y+p_val(w, 29));
        ctx.fill();
    }
    function diagonal_inner_shadow_left(x, y, w, h, l_shade, d_shade){
        ctx.beginPath();
        ctx.fillStyle = d_shade[1];
        ctx.moveTo(x+w-p_val(w, 24.5), y+p_val(w, 3.5));
        ctx.lineTo(x+p_val(w, 4), y+h-p_val(w, 27));
        ctx.lineTo(x+p_val(w, 7), y+h-p_val(w, 36));
        ctx.lineTo(x+w-p_val(w, 30), y+p_val(w, 6));
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = l_shade[1];
        ctx.moveTo(x+w-p_val(w, 4), y+p_val(w, 27));
        ctx.lineTo(x+p_val(w, 24), y+h-p_val(w, 3.5));
        ctx.lineTo(x+p_val(w, 30), y+h-p_val(w, 7));
        ctx.lineTo(x+w-p_val(w, 7), y+p_val(w, 36));
        ctx.fill();
    }

    function diagonal_inner_shadow_right(x, y, w, h, l_shade, d_shade){
        ctx.beginPath();
        ctx.fillStyle = l_shade[1];
        ctx.moveTo(x+p_val(w, 24.5), y+p_val(w, 3.5));
        ctx.lineTo(x+w-p_val(w, 4), y+h-p_val(w, 27));
        ctx.lineTo(x+w-p_val(w, 7), y+h-p_val(w, 36));
        ctx.lineTo(x+p_val(w, 30), y+p_val(w, 6));
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = d_shade[1];
        ctx.moveTo(x+p_val(w, 4), y+p_val(w, 27));
        ctx.lineTo(x+w-p_val(w, 24), y+h-p_val(w, 3.5));
        ctx.lineTo(x+w-p_val(w, 30), y+h-p_val(w, 7));
        ctx.lineTo(x+p_val(w, 7), y+p_val(w, 36));
        ctx.fill();
    }

    function stamp_triangle_ltr(stamp_x, stamp_y, stamp_w, stamp_h, l_shadow, d_shades, s_count, pair_count){
        var s_width = 4;
        ctx.beginPath();
        // ctx.strokeStyle = 'red';
        ctx.moveTo(stamp_x, stamp_y);
        ctx.lineTo(stamp_x, (+stamp_y) + (+stamp_h)-(+p_val(stamp_w, 18)));
        ctx.lineTo((+stamp_x) + ((+stamp_w)-(+p_val(stamp_w, 18))), stamp_y);
        ctx.lineTo(stamp_x, stamp_y);
        ctx.stroke();

        ctx.save();

        ctx.clip();
            
            left_shadow(stamp_x+p_val(stamp_w, 0.1), stamp_y, (+stamp_y)+(+stamp_h)-(+p_val(stamp_w, 18)), d_shades[2], stamp_w, s_width);
            top_shadow(stamp_x+p_val(stamp_w, 0.1), stamp_y, (+stamp_w)-(+p_val(stamp_w, 20)), d_shades[1], s_width);

            beadboard_base(stamp_x+(p_val(stamp_w, 3)), stamp_y+(p_val(stamp_w, 3)),stamp_w-(p_val(stamp_w, 10)), stamp_h-(p_val(stamp_w, 10)), l_shadow, d_shades, s_count);

        ctx.restore();       



        ctx.beginPath();
        ctx.moveTo((+stamp_x)+(+p_val(stamp_w, 18)), (+stamp_y)+(+stamp_h));
        ctx.lineTo((+stamp_x)+(+stamp_w), (+stamp_y) + (+stamp_h));
        ctx.lineTo((+stamp_x) + (+stamp_w), (+stamp_y)+(+p_val(stamp_w, 18)));
        ctx.lineTo((+stamp_x)+(+p_val(stamp_w, 18)), (+stamp_y)+(+stamp_h));
        ctx.stroke();

        ctx.save();

        ctx.clip();

            right_shadow((+stamp_x)+(+stamp_w), stamp_y, stamp_h, l_shadow[2], stamp_w, s_width);
            bottom_shadow(stamp_x, stamp_y, stamp_w, stamp_h, l_shadow[1], s_width);

            beadboard_base(stamp_x+(p_val(stamp_w, 3)), stamp_y+(p_val(stamp_w, 3)),stamp_w-(p_val(stamp_w, 6)), stamp_h-(p_val(stamp_w, 6)), l_shadow, d_shades, s_count);

        ctx.restore();


        diagonal_shadow_left(stamp_x, stamp_y, stamp_w, stamp_h,  l_shadow, d_shades);
        diagonal_inner_shadow_left(stamp_x, stamp_y, stamp_w, stamp_h,  l_shadow, d_shades);
    }

    function stamp_triangle_rtl(stamp_x, stamp_y, stamp_w, stamp_h, l_shadow, d_shades, s_count, pair_count){
        var w = stamp_w;
        var s_width = 4;
        ctx.beginPath();
        ctx.moveTo(stamp_x+p_val(w, 18), stamp_y);
        ctx.lineTo(stamp_x + stamp_w, stamp_y);
        ctx.lineTo(stamp_x + stamp_w, stamp_y + (stamp_h-p_val(w, 18)));
        ctx.lineTo(stamp_x+p_val(w, 18), stamp_y);
        ctx.stroke();

        ctx.save();

        ctx.clip();

            top_shadow(stamp_x+p_val(stamp_w, 0.1), stamp_y, stamp_w, d_shades[1], s_width);
            right_shadow(stamp_x+(stamp_w), stamp_y, stamp_h-p_val(stamp_w, 20), l_shadow[2], stamp_w, s_width);

            beadboard_base(stamp_x+(p_val(stamp_w, 3)), stamp_y+(p_val(stamp_w, 3)), stamp_w-(p_val(stamp_w, 6)), stamp_h-(p_val(stamp_w, 6)), l_shadow, d_shades, s_count);

        ctx.restore();


        ctx.beginPath();
        ctx.moveTo(stamp_x, stamp_y + p_val(w, 18));
        ctx.lineTo(stamp_x, stamp_y + stamp_h);
        ctx.lineTo(stamp_x + (stamp_w-p_val(w, 18)), stamp_y + stamp_h);
        ctx.lineTo(stamp_x, stamp_y + p_val(w, 18));
        ctx.stroke();

        ctx.save();

        ctx.clip();

            left_shadow(stamp_x+p_val(stamp_w, 0.1), stamp_y, stamp_y+stamp_h, d_shades[2], stamp_w, s_width);
            bottom_shadow(stamp_x, stamp_y,stamp_w, stamp_h, l_shadow[1], s_width);

            beadboard_base(stamp_x+p_val(stamp_w, 3), stamp_y+p_val(stamp_w, 3),stamp_w-p_val(stamp_w, 6), stamp_h-p_val(stamp_w, 6), l_shadow, d_shades, s_count);

        ctx.restore();

        diagonal_shadow_right(stamp_x, stamp_y, stamp_w, stamp_h,  l_shadow, d_shades);
        diagonal_inner_shadow_right(stamp_x, stamp_y, stamp_w, stamp_h,  l_shadow, d_shades);
        
    }


    function archedStamp_shadow_l(x, y, w, h, cp_x, cp_y, ls, ds, ps, s_count, pairs){
        if(ps == 0){
            var h1 = (+y) + (+h/3) + p_val(w, 5);
            var h1_inner = h1 + p_val(w, 1.5);

            var h2 = (+y) + p_val(w, 7);
            var h2_inner = h2 + p_val(w, 4);

            var cp_y_inner = cp_y + p_val(w, 3.2);
            var cp_x_inner = cp_x + p_val(w, 1.5);
        }
        else{
            var h1 = (+y) + p_val(w, 4.5);
            var h1_inner = h1 + p_val(w, 3);

            var h2 = y;
            var h2_inner = h2 + p_val(w, 3);

            var cp_x_inner = cp_x + p_val(w, 1);
            var cp_y_inner = cp_y + p_val(w, 2.7);
        }

        ctx.beginPath();
        ctx.fillStyle = ds[2];
        ctx.moveTo(x, (+y) + (+h));
        ctx.lineTo(x, h1);
        ctx.lineTo(x + p_val(w, 3), h1_inner);
        ctx.lineTo((+x) + p_val(w, 3), (+y) + (+h) - p_val(w, 3));
        ctx.lineTo(x, (+y) + (+h));
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = ds[1];
        ctx.moveTo(x, h1);
        ctx.quadraticCurveTo(cp_x, cp_y, (+x) + (+w) + p_val(w, 0.5), h2);
        ctx.lineTo((+x) + (+w) - p_val(w, 3), h2_inner);
        ctx.quadraticCurveTo(cp_x_inner, cp_y_inner, x + p_val(w, 3.5), h1_inner);
        ctx.lineTo(x, h1);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = ls[1];
        ctx.moveTo((+x) + (+w) , h2);
        ctx.lineTo((+x) + (+w) , (+y) + (+h));
        ctx.lineTo((+x) + (+w) - p_val(w, 3), (+y) + (+h) - p_val(w, 3));
        ctx.lineTo((+x) + (+w) - p_val(w, 3), h2_inner);
        ctx.lineTo((+x) + (+w) , h2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = ls[2];
        ctx.moveTo(x + p_val(w, 3) , (+y) + (+h) - p_val(w, 3));
        ctx.lineTo((+x) + (+w) - p_val(w, 3), (+y) + (+h) - p_val(w, 3));
        ctx.lineTo((+x) + (+w), (+y) + (+h));
        ctx.lineTo(x, (+y) + (+h));
        ctx.lineTo((+x) + p_val(w, 3) , (+y) + (+h) - p_val(w, 3));
        ctx.fill();

        beadboard_base_arched(x+p_val(w, 3.25), y+p_val(w, 3.25), w-p_val(w, 6.5), h-p_val(w, 6.5), ls, ds, ps, pairs);
    }


    function archedStamp_shadow_r(x, y, w, h, cp_x, cp_y, ls, ds, ps, s_count, pairs){
        if(ps == 1){
            var h1 = (+y) + (+h/3) + p_val(w, 5);
            var h1_inner = h1 + p_val(w, 2);

            var h2 = (+y) + p_val(w, 7);
            var h2_inner = h2 + p_val(w, 4.5);

            var cp_y_inner = cp_y + p_val(w, 4);
            var cp_x_inner = cp_x + p_val(w, 3);
        }
        else{
            var h1 = (+y) + p_val(w, 4.5);
            var h1_inner = h1 + p_val(w, 3);

            var h2 = y;
            var h2_inner = h2 + p_val(w, 3);

            var cp_x_inner = cp_x + p_val(w, 1);
            var cp_y_inner = cp_y + p_val(w, 2.7);
        }

        ctx.beginPath();
        ctx.fillStyle = ds[2];
        ctx.moveTo(x, (+y) + (+h));
        ctx.lineTo(x, h2);
        ctx.lineTo(x + p_val(w, 3), h2_inner);
        ctx.lineTo((+x) + p_val(w, 3), (+y) + (+h) - p_val(w, 3));
        ctx.lineTo(x, (+y) + (+h));
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = ds[1];
        ctx.moveTo(x, h2);
        ctx.quadraticCurveTo(cp_x, cp_y, (+x) + (+w) + p_val(w, 0.5), h1);
        ctx.lineTo((+x) + (+w) - p_val(w, 3), h1_inner);
        ctx.quadraticCurveTo(cp_x_inner, cp_y_inner, x + p_val(w, 3), h2_inner);
        ctx.lineTo(x, h2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = ls[1];
        ctx.moveTo((+x) + (+w) , h1);
        ctx.lineTo((+x) + (+w) , (+y) + (+h));
        ctx.lineTo((+x) + (+w) - p_val(w, 3), (+y) + (+h) - p_val(w, 3));
        ctx.lineTo((+x) + (+w) - p_val(w, 3), h1_inner);
        ctx.lineTo((+x) + (+w) , h1);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = ls[2];
        ctx.moveTo(x + p_val(w, 3) , (+y) + (+h) - p_val(w, 3));
        ctx.lineTo((+x) + (+w) - p_val(w, 3), (+y) + (+h) - p_val(w, 3));
        ctx.lineTo((+x) + (+w), (+y) + (+h));
        ctx.lineTo(x, (+y) + (+h));
        ctx.lineTo((+x) + p_val(w, 3) , (+y) + (+h) - p_val(w, 3));
        ctx.fill();

        beadboard_base_arched(x+p_val(w, 3.25), y+p_val(w, 3.25), w-p_val(w, 6.5), h-p_val(w, 6.5), ls, ds, ps, pairs);
    }

    function pair_of_ArchedStamps(x, y, w, h, s_count, pairs){  
        var p_width = convert_sizes_inch(panel_width).toFixed(3);
        var pp_width = convert_sizes_inch(panelsPair_width).toFixed(3);
        var p_spacing = convert_sizes_inch(panel_spacing).toFixed(3);
        var pp_count = panel_pairs[w_ft];

        

        var x_pos = (+x);
        for(ps = 0; ps<2; ps++){
           

            if(pairs%2){
                if(ps == 0){
                    archedStamp_outline_l(x_pos, y, p_width, h, (+x_pos) + (+p_width/3), (+y) + p_val(w, 10.25), lighter_shades, darker_shades, ps);
                    archedStamp_shadow_l(x_pos + p_val(w, 0.5), y + p_val(w, 0.5), p_width - p_val(w, 1.25), h - p_val(w, 1.25), (+x_pos) + (+p_width/3) + p_val(w, 1.5), (+y) + p_val(w, 10.25), lighter_shades, darker_shades, ps, s_count, pairs);
                }
                else{
                    archedStamp_outline_l(x_pos, y, p_width, h, (+x_pos) + (+p_width/2), (+y), lighter_shades, darker_shades, ps);
                    archedStamp_shadow_l(x_pos + p_val(w, 0.5), y + p_val(w, 0.5), p_width - p_val(w, 1.25), h - p_val(w, 1.25), (+x_pos) + (+p_width/2) + p_val(w, 0.5), (+y) + p_val(w, 0.5), lighter_shades, darker_shades, ps, s_count, pairs);
                }
            }
            else{

                if(ps == 0){
                    archedStamp_outline_r(x_pos, y, p_width, h, (+x_pos) + (+p_width/2), y, lighter_shades, darker_shades, ps);
                    archedStamp_shadow_r(x_pos + p_val(w, 0.5), y + p_val(w, 0.5), p_width - p_val(w, 1.25), h - p_val(w, 1.25), (+x_pos) +  (+p_width/2) + p_val(w, 10), y + p_val(w, 1), lighter_shades, darker_shades, ps, s_count, pairs);
                }
                else{
                    archedStamp_outline_r(x_pos, y, p_width, h, (+x_pos) + ((+p_width/3)*2), (+y) + p_val(w, 10.25), lighter_shades, darker_shades, ps);
                    archedStamp_shadow_r(x_pos + p_val(w, 0.5), y + p_val(w, 0.5), p_width - p_val(w, 1.25), h - p_val(w, 1.25), (+x_pos) + (+p_width/3) + p_val(w, 10), (+y) + p_val(w, 9.5), lighter_shades, darker_shades, ps, s_count, pairs);
                }
            }

            x_pos = (+x_pos) + (+p_width) + (+p_spacing);
        }
    }

    function pair_of_stamps(x, y, w, h, s_count, pairs, sec_count){        
        var p_width = convert_sizes_inch(panel_width).toFixed(3);
        var p_spacing = convert_sizes_inch(panel_spacing).toFixed(3);
        var pp_count = panel_pairs[w_ft];
        var diagon_val = [];
        var diagon_val_2 = [];

        if(sec_count == 3){
            diagon_val = [2, 3];
        }
        else if(sec_count == 4){
            diagon_val = [3, 4];
        }
        else if(sec_count == 5){
            diagon_val = [2, 3];
            diagon_val_2 = [4, 5];
        }
        else if(sec_count == 6){
            diagon_val = [3, 4];
            diagon_val_2 = [5, 6];
        }

        var x_pos = (+x);
        for(ps = 0; ps<2; ps++){
            stamp_outline(x_pos, y, p_width, h, lighter_shades, darker_shades);

            if(selectedPanel =='Tuscany'){                
                stamp_shadow(x_pos+p_val(w, 0.3), y+p_val(w, 0.3), p_width-p_val(w, 0.6), h-p_val(w, 0.6), lighter_shades, darker_shades, s_count);
            }
            else if(selectedPanel == 'Lucern'){
                if(s_count == diagon_val[0] || s_count == diagon_val_2[0]){
                    if(pairs == 1){
                        if(ps == 1){
                            stamp_triangle_ltr(x_pos+p_val(w, 0.3), y+p_val(w, 0.6), p_width-p_val(w, 0.6), h-p_val(w, 0.9), lighter_shades, darker_shades, s_count, ps); 
                        }
                        else{
                            stamp_shadow_t(x_pos+p_val(w, 0.3), y+p_val(w, 0.6), p_width-p_val(w, 0.6), h-p_val(w, 0.9), lighter_shades, darker_shades, s_count, ps);    
                        }
                    }
                    else if(pairs == 2){
                        if(pp_count != 3 ){
                            if(ps == 0){
                                stamp_triangle_rtl(x_pos+p_val(w, 0.3), y+p_val(w, 0.6), p_width-p_val(w, 0.6), h-p_val(w, 0.9), lighter_shades, darker_shades, s_count, ps);
                            }
                            else{
                                stamp_shadow_t(x_pos+p_val(w, 0.3), y+p_val(w, 0.6), p_width-p_val(w, 0.6), h-p_val(w, 0.9), lighter_shades, darker_shades, s_count, ps);    
                            }
                        }
                        else{
                            stamp_shadow_t(x_pos+p_val(w, 0.3), y+p_val(w, 0.6), p_width-p_val(w, 0.6), h-p_val(w, 0.9), lighter_shades, darker_shades, s_count, ps);    
                        }
                    }
                    else if(pairs == 3){
                        
                        if(pp_count == 3){
                            if(ps==0){
                                stamp_triangle_rtl(x_pos+p_val(w, 0.3), y+p_val(w, 0.6), p_width-p_val(w, 0.6), h-p_val(w, 0.9), lighter_shades, darker_shades, s_count, ps);
                            }
                            else{
                                stamp_shadow_t(x_pos+p_val(w, 0.3), y+p_val(w, 0.6), p_width-p_val(w, 0.6), h-p_val(w, 0.9), lighter_shades, darker_shades, s_count, ps);    
                            }
                        }
                        else if(pp_count == 5){
                            stamp_shadow_t(x_pos+p_val(w, 0.3), y+p_val(w, 0.6), p_width-p_val(w, 0.6), h-p_val(w, 0.9), lighter_shades, darker_shades, s_count, ps);    
                        }
                        else{
                            if(ps == 1){
                                stamp_triangle_ltr(x_pos+p_val(w, 0.3), y+p_val(w, 0.6), p_width-p_val(w, 0.6), h-p_val(w, 0.9), lighter_shades, darker_shades, s_count, ps); 
                            }
                            else{
                                stamp_shadow_t(x_pos+p_val(w, 0.3), y+p_val(w, 0.6), p_width-p_val(w, 0.6), h-p_val(w, 0.9), lighter_shades, darker_shades, s_count, ps);    
                            }
                        }
                    }
                    else if(pairs == 4){
                        if(pp_count == 5){
                            if(ps == 1){
                                stamp_triangle_ltr(x_pos+p_val(w, 0.3), y+p_val(w, 0.6), p_width-p_val(w, 0.6), h-p_val(w, 0.9), lighter_shades, darker_shades, s_count, ps); 
                            }
                            else{
                                stamp_shadow_t(x_pos+p_val(w, 0.3), y+p_val(w, 0.6), p_width-p_val(w, 0.6), h-p_val(w, 0.9), lighter_shades, darker_shades, s_count, ps);    
                            }
                        }
                        else if(pp_count == 4){
                            if(ps == 0){
                                stamp_triangle_rtl(x_pos+p_val(w, 0.3), y+p_val(w, 0.6), p_width-p_val(w, 0.6), h-p_val(w, 0.9), lighter_shades, darker_shades, s_count, ps);
                            }
                            else{
                                stamp_shadow_t(x_pos+p_val(w, 0.3), y+p_val(w, 0.6), p_width-p_val(w, 0.6), h-p_val(w, 0.9), lighter_shades, darker_shades, s_count, ps);    
                            }
                        }
                    }
                    else if(pairs == pp_count){
                        if(ps == 0){
                            stamp_triangle_rtl(x_pos+p_val(w, 0.3), y+p_val(w, 0.6), p_width-p_val(w, 0.6), h-p_val(w, 0.9), lighter_shades, darker_shades, s_count, ps);
                        }
                        else{
                            stamp_shadow_t(x_pos+p_val(w, 0.3), y+p_val(w, 0.6), p_width-p_val(w, 0.6), h-p_val(w, 0.9), lighter_shades, darker_shades, s_count, ps);    
                        }
                    }
                    else{
                        stamp_shadow_t(x_pos+p_val(w, 0.3), y+p_val(w, 0.6), p_width-p_val(w, 0.6), h-p_val(w, 0.9), lighter_shades, darker_shades, s_count, ps);    
                    }
                }
                else if(s_count == diagon_val[1] || s_count == diagon_val_2[1]){
                    if(pairs == 1){
                        if(ps == 0){
                            stamp_triangle_ltr(x_pos+1, y+1, p_width-2, h-2, lighter_shades, darker_shades, s_count, ps); 
                        }
                        else{
                            stamp_shadow_t(x_pos+1, y+1, p_width-2, h-2, lighter_shades, darker_shades, s_count, ps);    
                        }
                    }
                    else if (pairs == 2){
                        if(pp_count == 3 ){
                            stamp_shadow_t(x_pos+1, y+1, p_width-2, h-2, lighter_shades, darker_shades, s_count, ps);
                        }
                        else{
                            if(ps == 1){
                                stamp_triangle_rtl(x_pos+1, y+1, p_width-2, h-2, lighter_shades, darker_shades, s_count, ps);
                            }
                            else{
                                stamp_shadow_t(x_pos+1, y+1, p_width-2, h-2, lighter_shades, darker_shades, s_count, ps);
                            }
                        }
                    }
                    else if(pairs == 3){
                        if(pp_count == 3){
                            if(ps == 1){
                                stamp_triangle_rtl(x_pos+1, y+1, p_width-2, h-2, lighter_shades, darker_shades, s_count, ps);
                            }
                            else{
                                stamp_shadow_t(x_pos+1, y+1, p_width-2, h-2, lighter_shades, darker_shades, s_count, ps);    
                            }
                        }
                        else if(pp_count!=5){
                            if(ps == 0){
                                stamp_triangle_ltr(x_pos+1, y+1, p_width-2, h-2, lighter_shades, darker_shades, s_count, ps); 
                            }
                            else{
                                stamp_shadow_t(x_pos+1, y+1, p_width-2, h-2, lighter_shades, darker_shades, s_count, ps);    
                            }
                        }
                        else{
                            stamp_shadow_t(x_pos+1, y+1, p_width-2, h-2, lighter_shades, darker_shades, s_count, ps);    
                        }
                    }
                    else if(pairs == 4){
                        if(pp_count == 4){
                            if(ps == 1){
                                stamp_triangle_rtl(x_pos+1, y+1, p_width-2, h-2, lighter_shades, darker_shades, s_count, ps);
                            }
                            else{
                                stamp_shadow_t(x_pos+1, y+1, p_width-2, h-2, lighter_shades, darker_shades, s_count, ps);    
                            }
                        }
                        else{
                            if(ps == 0){
                                stamp_triangle_ltr(x_pos+1, y+1, p_width-2, h-2, lighter_shades, darker_shades, s_count, ps); 
                            }
                            else{
                                stamp_shadow_t(x_pos+1, y+1, p_width-2, h-2, lighter_shades, darker_shades, s_count, ps);    
                            }
                        }
                    }
                    else if(pairs == pp_count){
                        if(ps == 1){
                            stamp_triangle_rtl(x_pos+1, y+1, p_width-2, h-2, lighter_shades, darker_shades, s_count, ps);
                        }
                        else{
                            stamp_shadow_t(x_pos+1, y+1, p_width-2, h-2, lighter_shades, darker_shades, s_count, ps);    
                        }
                    }
                    else{
                        stamp_shadow_t(x_pos+1, y+1, p_width-2, h-2, lighter_shades, darker_shades, s_count, ps);
                    }
                }
                else{
                    stamp_shadow_t(x_pos+1, y+1, p_width-2, h-2, lighter_shades, darker_shades, s_count, ps);
                }
            }
            else if(selectedPanel == 'Santiago'){
                if(s_count == diagon_val[0] || s_count == diagon_val_2[0]){
                    if(ps == 1){
                        stamp_triangle_ltr(x_pos+1, y+1, p_width-2, h-2, lighter_shades, darker_shades, s_count, ps); 
                    }
                    else{
                        stamp_triangle_rtl(x_pos+1, y+1, p_width-2, h-2, lighter_shades, darker_shades, s_count, ps);    
                    }
                    
                }
                else if(s_count == diagon_val[1] || s_count == diagon_val_2[1]){
                    if(ps == 0){
                        stamp_triangle_ltr(x_pos+1, y+1, p_width-2, h-2, lighter_shades, darker_shades, s_count, ps); 
                    }
                    else{
                        stamp_triangle_rtl(x_pos+1, y+1, p_width-2, h-2, lighter_shades, darker_shades, s_count, ps);    
                    }
                }
                else{
                    stamp_shadow_t(x_pos+1, y+1, p_width-2, h-2, lighter_shades, darker_shades, s_count, ps);
                }
            }
            else if(selectedPanel == 'Valencia'){
                if(s_count == diagon_val[0] || s_count == diagon_val_2[0]){
                    if(ps == 1){
                        stamp_triangle_rtl(x_pos+1, y+1, p_width-2, h-2, lighter_shades, darker_shades, s_count, ps); 
                    }
                    else{
                        stamp_triangle_ltr(x_pos+1, y+1, p_width-2, h-2, lighter_shades, darker_shades, s_count, ps);    
                    }
                }
                else if(s_count == diagon_val[1] || s_count == diagon_val_2[1]){
                    if(ps == 0){
                        stamp_triangle_rtl(x_pos+1, y+1, p_width-2, h-2, lighter_shades, darker_shades, s_count, ps); 
                    }
                    else{
                        stamp_triangle_ltr(x_pos+1, y+1, p_width-2, h-2, lighter_shades, darker_shades, s_count, ps);    
                    }   
                }
                else{
                    stamp_shadow_t(x_pos+1, y+1, p_width-2, h-2, lighter_shades, darker_shades, s_count, ps);
                }
            }

            x_pos = (+x_pos) + (+p_width) + (+p_spacing);
        }
    }


    

    // ================================================================================Window==
    function frame_outer_shadow(x, y, w, h, ls, ds){
        ctx.beginPath();
        ctx.fillStyle = ls[1];
        ctx.moveTo(x, y);
        ctx.lineTo(x, (+y) + (+h));
        ctx.lineTo(x + p_val(w, 0.8), (+y) + (+h)-p_val(w, 0.25));
        ctx.lineTo(x + p_val(w, 0.8), (+y) + p_val(w, 0.25));
        ctx.lineTo(x, y);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = ds[0];
        ctx.moveTo(x, y);
        ctx.lineTo((+x)+(+w), y);
        ctx.lineTo((+x)+(+w) - p_val(w, 1), (+y) + p_val(w, 0.6));
        ctx.lineTo(x + p_val(w, 0.5), (+y) + p_val(w, 0.6));
        ctx.lineTo(x, y);
        ctx.fill();
        
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.moveTo((+x)+(+w), y);
        ctx.lineTo((+x)+(+w), (+y)+(+h));
        ctx.lineTo((+x)+(+w) - p_val(w, 0.8), (+y)+(+h) - p_val(w, 0.25));
        ctx.lineTo((+x)+(+w) - p_val(w, 0.8), y + p_val(w, 0.25));
        ctx.lineTo((+x)+(+w), y);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = ds[1];
        ctx.moveTo(x, (+y)+(+h));
        ctx.lineTo((+x)+(+w), (+y)+(+h));
        ctx.lineTo((+x)+(+w) - p_val(w, 0.5), (+y)+(+h) - p_val(w, 0.6));
        ctx.lineTo(x + p_val(w, 0.5), (+y)+(+h) - p_val(w, 0.6));
        ctx.lineTo(x, (+y)+(+h));
        ctx.fill();
    }

    

    function frame_base(x, y, w, h, ls, ds){
        ctx.beginPath();
        ctx.fillStyle = base_color;
        // ctx.fillRect(x + 2, y+1, (+w) - 4, h - 2);
        ctx.moveTo(x + p_val(w, 0.5), (+y) + (+h) - p_val(w, 0.5));
        ctx.lineTo(x + p_val(w, 2), (+y) + (+h)- p_val(w, 2.5));
        ctx.lineTo(x + p_val(w, 2), (+y) + p_val(w, 2.5));
        ctx.lineTo(x+p_val(w, 1), y+p_val(w, 0.5));
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x + p_val(w, 0.5), y + p_val(w, 0.5));
        ctx.lineTo((+x)+(+w) - p_val(w, 0.5), y + p_val(w, 0.5));
        ctx.lineTo((+x)+(+w) - p_val(w, 2), (+y) + p_val(w, 2));
        ctx.lineTo(x + p_val(w, 2), y + p_val(w, 2));
        ctx.lineTo(x + p_val(w, 1), y + p_val(w, 0.5));
        ctx.fill();
        
        ctx.beginPath();
        // ctx.fillStyle = 'purple'; // basecolor
        ctx.moveTo((+x)+(+w) - p_val(w, 1), y + p_val(w, 0.5));
        ctx.lineTo((+x)+(+w) - p_val(w, 2.5), y + p_val(w, 2));
        ctx.lineTo((+x)+(+w) - p_val(w, 2.5), (+y)+(+h) - p_val(w, 2));
        ctx.lineTo((+x)+(+w) - p_val(w, 1), (+y)+(+h) - p_val(w, 0.5));
        ctx.lineTo((+x)+(+w) - p_val(w, 1), y + p_val(w, 0.5));
        ctx.fill();

        ctx.beginPath();
        // ctx.fillStyle = 'blue'; //basecolor
        ctx.moveTo(x + p_val(w, 0.5), (+y)+(+h) - p_val(w, 0.5));
        ctx.lineTo((+x)+(+w) - p_val(w, 0.5), (+y)+(+h) - p_val(w, 0.5));
        ctx.lineTo((+x)+(+w) - p_val(w, 2.5), (+y)+(+h) - p_val(w, 2));
        ctx.lineTo(x + p_val(w, 2.5), (+y)+(+h) - p_val(w, 2));
        ctx.lineTo(x + p_val(w, 0.5), (+y)+(+h) - p_val(w, 0.5));
        ctx.fill();

        ctx.beginPath();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.moveTo(x + p_val(w, 2.5), y + p_val(w, 2.2));
        ctx.lineTo(x + p_val(w, 2.5), (+y) + (+h) - p_val(w, 2));
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.moveTo(x + p_val(w, 2.5), y + p_val(w, 2.2));
        ctx.lineTo((+x) + (+w) - p_val(w, 2.5), y + p_val(w, 2.2));
        ctx.stroke();

        ctx.beginPath();        
        ctx.strokeStyle = ls[1];
        ctx.moveTo((+x) + (+w) - p_val(w, 2.5), y + p_val(w, 2.2));
        ctx.lineTo((+x) + (+w) - p_val(w, 2.5), (+y) + (+h) - p_val(w, 2.2));
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = base_color;
        ctx.moveTo((+x) + (+w) - p_val(w, 2.5), y + h - p_val(w, 2));
        ctx.lineTo((+x) + p_val(w, 2.3), (+y) + (+h) - p_val(w, 2));
        ctx.stroke();
    }

    function frame_inner_shadow(x, y, w, h, ls, ds){
        ctx.beginPath();
        ctx.fillStyle = ds[2];
        ctx.moveTo(x + p_val(w, 2.4), y + p_val(w, 2));
        ctx.lineTo(x + p_val(w, 3.8), y + p_val(w, 3.5));
        ctx.lineTo(x + p_val(w, 3.8), (+y) + (+h) - p_val(w, 3.7));
        ctx.lineTo(x + p_val(w, 2.4), (+y) + (+h) - p_val(w, 2));
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = ds[0];
        ctx.moveTo(x + p_val(w, 2.5), y + p_val(w, 2.5));
        ctx.lineTo((+x) + (+w) - p_val(w, 3), y + p_val(w, 2.5));
        ctx.lineTo((+x) + (+w) - p_val(w, 4.1), y + p_val(w, 3.5));
        ctx.lineTo((+x) + p_val(w, 3.8), y + p_val(w, 3.5));
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = ls[1];
        ctx.moveTo((+x) + (+w) - p_val(w, 2.7), y + p_val(w, 2));
        ctx.lineTo((+x) + (+w) - p_val(w, 2.7), (+y) + (+h) - p_val(w, 2));
        ctx.lineTo((+x) + (+w) - p_val(w, 3.6), (+y) + (+h) - p_val(w, 2.9));
        ctx.lineTo((+x) + (+w) - p_val(w, 3.6), y + p_val(w, 2.9));
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = ls[0];
        ctx.moveTo((+x) + (+w) - p_val(w, 2.7), (+y) + (+h) - p_val(w, 2));
        ctx.lineTo(x + p_val(w, 3), (+y) + (+h) - p_val(w, 2));
        ctx.lineTo(x + p_val(w, 3.6), (+y) + (+h) - p_val(w, 3.1));
        ctx.lineTo((+x) + (+w) - p_val(w, 3.6), (+y) + (+h) - p_val(w, 3.1));
        ctx.fill();

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.strokeRect(x + p_val(w, 3.6), y + p_val(w, 3.3), w - p_val(w, 7.5), h-p_val(w, 6.8));
        ctx.stroke();

        
    }


    function window_base(x_pos, y, pp_width, h, pPair_spacing, l_shade, d_shade){
        frame_base(x_pos, y, pp_width, h, l_shade, d_shade);
        frame_outer_shadow(x_pos, y, pp_width, h, l_shade, d_shade);
        frame_inner_shadow(x_pos, y, pp_width, h, l_shade, d_shade);
    }
    


    function glass_section(x, y, w, h){
        ctx.fillStyle = rad_grad(x, y, w, h);
        ctx.fillRect(x, y, w, h); 
        ctx.fill();
    }

    function hr_dt(x, y, lx, ls, ds, w){
        ctx.beginPath();
        ctx.lineWidth = p_val(w, 2.75);
        ctx.strokeStyle = base_color;
        ctx.moveTo(x, y + p_val(w, 1.25));
        ctx.lineTo(lx, y + p_val(w, 1.25));
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = ls[1];
        ctx.moveTo(x + p_val(w, 1), y);
        ctx.lineTo(lx - p_val(w, 1), y);
        ctx.lineTo(lx, y + p_val(w, 1));
        ctx.lineTo(x, y + p_val(w, 1));
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = ds[2];
        ctx.moveTo(x, y + p_val(w, 1.75));
        ctx.lineTo(lx, y + p_val(w, 1.75));
        ctx.lineTo(lx - p_val(w, 1), y + p_val(w, 2.5));
        ctx.lineTo(x + p_val(w, 1), y + p_val(w, 2.5));
        ctx.fill();
    }

    

    function vr_dt(x, y, lwidth, h, ls, ds, w){
        var lw = 0;
        lw = lwidth;
        ctx.beginPath();
        ctx.lineWidth = lw;
        ctx.strokeStyle = base_color;
        ctx.moveTo((+x), y-p_val(w, 0.5));
        ctx.lineTo((+x), (+y) + (+h));
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = ls[1];
        ctx.moveTo(x - (+lw/2), y + p_val(w, 1));
        ctx.lineTo(x - (+lw/2) + p_val(w, 1), y);
        ctx.lineTo(x - (+lw/2) + p_val(w, 1), (+y) + (+h));
        ctx.lineTo(x - (+lw/2), (+y) + (+h) - p_val(w, 1));
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = ds[2];
        ctx.moveTo(x + (+lw/2), y + p_val(w, 1));
        ctx.lineTo(x + (+lw/2) - p_val(w, 1), y);
        ctx.lineTo(x + (+lw/2) - p_val(w, 1), (+y) + (+h));
        ctx.lineTo(x + (+lw/2), (+y) + (+h) - p_val(w, 1));
        ctx.fill();

    }

    function hr_dt_rhine(x, y, lx, ls, ds, w){
        ctx.beginPath();
        ctx.lineWidth = p_val(w, 3);
        ctx.strokeStyle = base_color;
        ctx.moveTo(x, y + p_val(w, 1.25));
        ctx.lineTo(lx, y + p_val(w, 1.25));
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = ls[1];
        ctx.moveTo(x + p_val(w, 2), y - p_val(w, 1));
        ctx.lineTo(lx - p_val(w, 2), y - p_val(w, 1));
        ctx.lineTo(lx, y + p_val(w, 0.5));
        ctx.lineTo(x, y + p_val(w, 0.5));
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = ds[2];
        ctx.moveTo(x, y + p_val(w, 2.5));
        ctx.lineTo(lx, y + p_val(w, 2.5));
        ctx.lineTo(lx - p_val(w, 2), y + p_val(w, 4));
        ctx.lineTo(x + p_val(w, 2), y + p_val(w, 4));
        ctx.fill();
    }

    function vr_dt_rhine(x, y, lwidth, h, ls, ds, w){
        var lw = 0;
        lw = lwidth;
        ctx.beginPath();
        ctx.lineWidth = lw;
        ctx.strokeStyle = base_color;
        ctx.moveTo((+x), y-p_val(w, 0.5));
        ctx.lineTo((+x), (+y) + (+h));
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = ls[1];
        ctx.moveTo(x - (+lw/2), y + p_val(w, 1));
        ctx.lineTo(x - (+lw/2) + p_val(w, 2), y);
        ctx.lineTo(x - (+lw/2) + p_val(w, 2), (+y) + (+h));
        ctx.lineTo(x - (+lw/2), (+y) + (+h) - p_val(w, 1));
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = ds[2];
        ctx.moveTo(x + (+lw/2), y + p_val(w, 1));
        ctx.lineTo(x + (+lw/2) - p_val(w, 2), y);
        ctx.lineTo(x + (+lw/2) - p_val(w, 2), (+y) + (+h));
        ctx.lineTo(x + (+lw/2), (+y) + (+h) - p_val(w, 1));
        ctx.fill();

    }


    function create_curve(x, y, w, h, ls, ds){
        ctx.beginPath();
        ctx.fillStyle = base_color;
        // ctx.fillStyle = 'blue';
        ctx.moveTo((+x), (+y) + (h/3));
        if(h_ft=="06' 02"||h_ft=="06' 05"||h_ft=="06' 06"||h_ft=="06' 09"||h_ft=="06' 10"||h_ft=="07' 01"||h_ft=="08' 06"||h_ft=="08' 09"||h_ft=="08' 10"||h_ft=="09' 01"||h_ft=="09' 02"||h_ft=="09' 05"||h_ft=="09' 06"||h_ft=="09' 09"||h_ft=="10' 10"||h_ft=="11' 01"||h_ft=="11' 02"||h_ft=="11' 05"||h_ft=="11' 06"||h_ft=="11' 09"||h_ft=="11' 10"||h_ft=="12' 01"||h_ft=="12' 02"||h_ft=="12' 05"||h_ft=="13' 02"||h_ft=="13' 05"){
            ctx.bezierCurveTo((+x) + (+p_val(w, 25)), (+y) - (+p_val(w, 2)), (+x) + (+w) - (+p_val(w, 25)), (+y) - (+p_val(w, 2)), (+x) + (+w), (+y) + (h/3));
        }
        else{
            ctx.bezierCurveTo((+x) + (+p_val(w, 25)), (+y) - (+p_val(w, 4)), (+x) + (+w) - (+p_val(w, 25)), (+y) - (+p_val(w, 4)), (+x) + (+w), (+y) + (h/3));    
        }
        // ctx.bezierCurveTo((+x) + (+p_val(w, 25)), (+y) - (+p_val(w, 4)), (+x) + (+w) - (+p_val(w, 25)), (+y) - (+p_val(w, 4)), (+x) + (+w), (+y) + (h/3));
        ctx.lineTo((+x) + (+w) - (+p_val(w, 1.3)), y);
        ctx.lineTo(x, y);
        ctx.fill();
    }

    function create_curve_seine_rl(x, y, w, h, ls, ds, pp_count){       

        ctx.beginPath();
        ctx.fillStyle = base_color;
        // ctx.fillStyle = 'green';
        ctx.moveTo((+x) + p_val(w, 1), y + p_val(w, 1));
        ctx.bezierCurveTo(x + p_val(w, 35), y + p_val(w, 1), (+x) + (+w) - p_val(w, 35), y + p_val(w, 5) , (+x) + (+w), (+y) + (+h / 2) - p_val(w, 3));
        ctx.lineTo((+x) + (+w), y);
        ctx.lineTo((+x) + p_val(w, 1), y);
        ctx.fill();
    }

    function create_curve_seine_lr(x, y, w, h, ls, ds, pp_count){  
        ctx.beginPath();
        ctx.fillStyle = base_color;
        // ctx.fillStyle = 'red';
        ctx.moveTo(x + p_val(w, 1), (+y) + (+h / 2) - p_val(w, 3));
        ctx.bezierCurveTo(x + p_val(w, 35), (+y) + (+p_val(w, 5)), (+x) + (+w) - (+p_val(w, 35)), y + p_val(w, 2) , (+x) + (+w), y + p_val(w, 1));
        ctx.lineTo((+x) + (+w), y);
        ctx.lineTo(x + p_val(w, 1), y);
        ctx.fill();
    }


    function create_curve_rhine(x, y, w, h, ls, ds){
        ctx.beginPath();
        ctx.fillStyle = base_color;
        ctx.moveTo(x + p_val(w, 0.6), (+y) + (+h/3) - p_val(w, 7));
        if(h_ft=="06' 02"||h_ft=="06' 06"||h_ft=="06' 10"||h_ft=="08' 06"||h_ft=="08' 10"||h_ft=="09' 02"||h_ft=="09' 06"||h_ft=="10' 10"||h_ft=="11' 02"||h_ft=="11' 06"||h_ft=="11' 10"||h_ft=="12' 02"||h_ft=="13' 02"){
            ctx.bezierCurveTo((+x) + (+p_val(w, 25)), (+y) - (+p_val(w, 2)), (+x) + (+w) - p_val(w, 25), (+y) - (+p_val(w, 2)), (+x) + (+w) - (+p_val(w, 0.6)), (+y) + (+h/3) - p_val(w, 7));
        }
        else{
            ctx.bezierCurveTo((+x) + (+p_val(w, 25)), (+y) - (+p_val(w, 3.5)), (+x) + (+w) - p_val(w, 25), (+y) - (+p_val(w, 3.5)), (+x) + (+w) - (+p_val(w, 0.6)), (+y) + (+h/3) - p_val(w, 7));
        }    
        ctx.lineTo((+x) + (+w) - (+p_val(w, 0.6)), y);
        ctx.lineTo(x, y);
        ctx.fill();
    }
    function create_curve_rhine_shadow(x, y, w, h, ls, ds){
        ctx.beginPath();
        ctx.strokeStyle = ds[1];
        ctx.lineWidth = 3;
        ctx.moveTo(x + p_val(w, 2), (+y) + (+h/3) - p_val(w, 7));
        if(h_ft=="06' 02"||h_ft=="06' 06"||h_ft=="06' 10"||h_ft=="08' 06"||h_ft=="08' 10"||h_ft=="09' 02"||h_ft=="09' 06"||h_ft=="10' 10"||h_ft=="11' 02"||h_ft=="11' 06"||h_ft=="11' 10"||h_ft=="12' 02"||h_ft=="13' 02"){
            ctx.bezierCurveTo((+x) + (+p_val(w, 24)), (+y) - (+p_val(w, 1)), (+x) + (+w) - p_val(w, 24), (+y) - (+p_val(w, 1)), (+x) + (+w) - (+p_val(w, 2)), (+y) + (+h/3) - p_val(w, 7));        
        }
        else{
            ctx.bezierCurveTo((+x) + (+p_val(w, 24)), (+y) - (+p_val(w, 2.5)), (+x) + (+w) - p_val(w, 24), (+y) - (+p_val(w, 2.5)), (+x) + (+w) - (+p_val(w, 2)), (+y) + (+h/3) - p_val(w, 7));        
        }
        ctx.stroke();
    }

    function decratrim_madeira(x, y, w, h, ls, ds, pp_count){
        var x_pos = x;
        var vr_lines = 0;
        var dt_width = 0;

        if(selectedWindow == 'madeira' || selectedWindow == 'danube' || selectedWindow == 'seine'){
            vr_lines = 4;            
        }
        else if(selectedWindow == 'thames'){
            vr_lines = 3;
        }
        
        if(selectedWindow == 'danube'){
            curve_shadow(x-p_val(w, 0.75), y, w+ p_val(w, 1.5), h, ls, ds);
        }

        for(i = 1; i<=vr_lines; i++){            
            x_pos = (+x) + (i * (+w/(vr_lines + 1)) + p_val(w, 0.5));
            dt_width = p_val(w, 2.75);
            vr_dt(x_pos, y, dt_width, h, ls, ds, w);           
        }

        var x_pos = x;
        var lx_pos = 0;
        if(selectedWindow == 'madeira' || selectedWindow == 'danube' || selectedWindow == 'seine'){
            for(j = 1; j<=5; j++){
                lx_pos = (+x) + (j * (+w/5)) + p_val(w, 0.4);
                hr_dt(x_pos, (+y) + (+h/2) - p_val(w, 1), lx_pos, ls, ds, w);
                x_pos = (+x) + (j * (+w/5)) + p_val(w, 1);
            }
        }

        function curve_shadow(x, y, w, h, ls, ds){
            ctx.beginPath();
            ctx.strokeStyle = ds[1];
            ctx.lineWidth = p_val(w, 2);
            // ctx.strokeStyle = 'red';
            ctx.moveTo(x + p_val(w, 1), (+y) + (h/3) - p_val(w, 0.5));
            if(h_ft=="06' 02"||h_ft=="06' 05"||h_ft=="06' 06"||h_ft=="06' 09"||h_ft=="06' 10"||h_ft=="07' 01"||h_ft=="08' 06"||h_ft=="08' 09"||h_ft=="08' 10"||h_ft=="09' 01"||h_ft=="09' 02"||h_ft=="09' 05"||h_ft=="09' 06"||h_ft=="09' 09"||h_ft=="10' 10"||h_ft=="11' 01"||h_ft=="11' 02"||h_ft=="11' 05"||h_ft=="11' 06"||h_ft=="11' 09"||h_ft=="11' 10"||h_ft=="12' 01"||h_ft=="12' 02"||h_ft=="12' 05"||h_ft=="13' 02"||h_ft=="13' 05"){
                ctx.bezierCurveTo((+x) + (+p_val(w, 25)), (+y) - (+p_val(w, 1.5)), (+x) + (+w) - p_val(w, 25), (+y) - (+p_val(w, 1.5)), (+x) + (+w) - (+p_val(w, 1)), (+y) + (h/3) - p_val(w, 0.5));
            }
            else{
                ctx.bezierCurveTo((+x) + (+p_val(w, 25)), (+y) - (+p_val(w, 3.5)), (+x) + (+w) - p_val(w, 25), (+y) - (+p_val(w, 3.5)), (+x) + (+w) - (+p_val(w, 1)), (+y) + (h/3) - p_val(w, 0.5));
            }
            ctx.stroke();

        }

        if(selectedWindow == 'danube'){
            var curve_x = x-p_val(w, 0.75);
            create_curve(x-p_val(w, 0.75), y, w+ p_val(w, 1.5), h, ls, ds);                       
        }
        else if(selectedWindow == 'seine'){
            if(panel_pairs[w_ft] == 2 || panel_pairs[w_ft] == 4){
                if(pp_count%2 != 0){
                    create_curve_seine_lr(x-p_val(w, 0.75), y, w+ p_val(w, 1.5), h, ls, ds, pp_count);
                }
                else{
                    create_curve_seine_rl(x-p_val(w, 0.75), y, w+ p_val(w, 1.5), h, ls, ds, pp_count);
                }
            }
            else if(panel_pairs[w_ft] == 3){
                if(pp_count == 1){
                    create_curve_seine_lr(x-p_val(w, 0.75), y, w+ p_val(w, 1.5), h, ls, ds, pp_count);
                }
                else if(pp_count == 3){
                    create_curve_seine_rl(x-p_val(w, 0.75), y, w+ p_val(w, 1.5), h, ls, ds, pp_count);
                }
            }
            else if(panel_pairs[w_ft] == 5){
                if(pp_count == 1){
                    create_curve_seine_lr(x-p_val(w, 0.75), y, w+ p_val(w, 1.5), h, ls, ds, pp_count);
                }
                else if(pp_count == 5){
                    create_curve_seine_rl(x-p_val(w, 0.75), y, w+ p_val(w, 1.5), h, ls, ds, pp_count);
                }
            }
        }
    }

    function rhine_dt(x, y, w, h, ls, ds){
        var x_pos = x;
        var y_pos = y;
        var dt_width = p_val(w, 2.25);

        for(e = 0; e<2; e++){
            x_pos = (+x_pos) + (+w/3); 
            vr_dt(x_pos, y, dt_width, h, ls, ds, w);            
        }

        create_curve_rhine(x, y, w+p_val(w, 1.5), h, ls, ds);

        
        var lx_pos = 0;
        for(i = 0; i<2; i++){
            x_pos = x-1;
            y_pos = (+y_pos) + (+h/3);
            for(j = 1; j<=3; j++){
                lx_pos = (+x) + (j * (+w/3));
                hr_dt(x_pos, y_pos, lx_pos, ls, ds, w);
                x_pos = (+x) + (j * (+w/3)) + 2;
            }
        }
    }

    function rhine_dt_new(x, y, w, h, ls, ds){
        var x_pos = x;
        var y_pos = y;
        var dt_width = p_val(w, 6);

        if(selectedWindow == 'rhine'){
            create_curve_rhine_shadow(x, y, w, h, ls, ds);
        }

        for(e = 0; e<2; e++){
            x_pos = (+x_pos) + (+w/3); 
            vr_dt_rhine(x_pos, y, dt_width, h, ls, ds, w);            
        }


        var lx_pos = 0;
        for(i = 0; i<2; i++){
            x_pos = x + p_val(w, 1);
            y_pos = (+y_pos) + (+h/3);
            for(j = 1; j<=3; j++){
                lx_pos = (+x) + (j * (+w/3) - p_val(w, 1));
                hr_dt_rhine(x_pos, y_pos, lx_pos, ls, ds, w);
                x_pos = (+x) + (j * (+w/3)) + p_val(w, 1);
            }
        }

        create_curve_rhine(x, y, w, h, ls, ds);
    }

    function decratrim_thick(x, y, w, h, ls, ds){     
        
        var x_pos = x;
        var vr_lines = 1;
        var dt_width = p_val(w, 9.5);

        

        for(i = 0; i<vr_lines; i++){ 
            x_pos = (+x) + (+w/(vr_lines + 1));    
            vr_dt(x_pos, (+y) + p_val(w, 1.5) , dt_width, h - p_val(w, 3), ls, ds, w);                       
        }

        if(selectedWindow == 'rhine'){
            var x_pos2 = x + p_val(w, 1);
            for(z=1; z<=2; z++){
                rhine_dt_new(x_pos2, y + p_val(w, 1), (w/2)-p_val(w, 4.5), h - p_val(w, 2.5), ls, ds);
                x_pos2 = (+x) + (+w/2) + (+dt_width/2) - p_val(w, 1.5);
            }
        }
                
    }

    function w_shadow(x, y, w, h, ls, ds){
        //----------------------left
        ctx.beginPath();
        ctx.fillStyle = base_color;
        ctx.moveTo(x + p_val(w, 4.1), y + p_val(w, 3.7));
        ctx.lineTo(x + p_val(w, 6.35), y + p_val(w, 3.7));
        ctx.lineTo(x + p_val(w, 6.35), (+y) + (+h) - p_val(w, 3.7));
        ctx.lineTo(x + p_val(w, 4.1), (+y) + (+h) - p_val(w, 3.7));
        ctx.fill();
        // ----------------------top
        ctx.beginPath();
        ctx.moveTo(x + p_val(w, 4.1), y + p_val(w, 3.7));
        ctx.lineTo((+x) + (+w) - p_val(w, 4.1), y + p_val(w, 3.7));
        ctx.lineTo((+x) + (+w) - p_val(w, 4.1), y + p_val(w, 5.95));
        ctx.lineTo(x + p_val(w, 4.1), (+y) + p_val(w, 5.95));
        ctx.fill();
        // -----------------------right
        ctx.beginPath();
        ctx.moveTo((+x) + (+w) - p_val(w, 4.1), y + p_val(w, 3.7));
        ctx.lineTo((+x) + (+w) - p_val(w, 6.35), y + p_val(w, 3.7));
        ctx.lineTo((+x) + (+w) - p_val(w, 6.35), (+y) + (+h) - p_val(w, 3.7));
        ctx.lineTo((+x) + (+w) - p_val(w, 4.1), (+y) + (+h) - p_val(w, 3.7));
        ctx.fill();
        // ----------------------bottom
        ctx.beginPath();
        ctx.moveTo(x + p_val(w, 4.1), (+y) + (+h) - p_val(w, 3.7));
        ctx.lineTo((+x) + (+w) - p_val(w, 4.1), (+y) + (+h) - p_val(w, 3.7));
        ctx.lineTo((+x) + (+w) - p_val(w, 4.1), (+y) + (+h) - p_val(w, 5.95));
        ctx.lineTo(x + p_val(w, 4.1), (+y) + (+h) - p_val(w, 5.95));
        ctx.fill();
        
        
// =================================================================================

        // ------------------------left
        ctx.beginPath();
        ctx.fillStyle = ls[1];
        // ctx.fillStyle = 'red';
        ctx.moveTo(x + p_val(w, 4.1), y + p_val(w, 3.7));
        ctx.lineTo(x + p_val(w, 4.85), y + p_val(w, 4.45));
        ctx.lineTo(x + p_val(w, 4.85), (+y) + (+h) - p_val(w, 4.45) );
        ctx.lineTo(x + p_val(w, 4.1), (+y) + (+h) - p_val(w, 3.7));
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = ds[1];
        // ctx.fillStyle = 'green';
        ctx.moveTo(x + p_val(w, 5.6), y + p_val(w, 5.2));
        ctx.lineTo(x + p_val(w, 6.35), y + p_val(w, 5.95));
        ctx.lineTo(x + p_val(w, 6.35), (+y) + (+h) - p_val(w, 5.95));
        ctx.lineTo(x + p_val(w, 5.6), (+y) + (+h) - p_val(w, 5.2));
        ctx.fill();

        // --------------------------------top
        ctx.beginPath();
        ctx.fillStyle = ls[0];
        // ctx.fillStyle = 'blue';
        ctx.moveTo(x + p_val(w, 4.1), y + p_val(w, 3.7));
        ctx.lineTo((+x) + (+w) - p_val(w, 4.1), y+p_val(w, 3.7));
        ctx.lineTo((+x) + (+w) - p_val(w, 4.85), y+ p_val(w, 4.45));
        ctx.lineTo(x + p_val(w, 4.85), y + p_val(w, 4.45))
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = ds[0];
        // ctx.fillStyle = 'magenta';
        ctx.moveTo(x + p_val(w, 5.6), y + p_val(w, 5.2));
        ctx.lineTo((+x) + (+w) - p_val(w, 5.6), y + p_val(w, 5.2));
        ctx.lineTo((+x) + (+w) - p_val(w, 6.35), y + p_val(w, 5.95));
        ctx.lineTo(x + p_val(w, 6.35), y + p_val(w, 5.95))
        ctx.fill();

        // --------------------------------------right
        ctx.beginPath();
        ctx.fillStyle = ds[2];
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.lineTo((+x) + (+w) - p_val(w, 4.1), y + p_val(w, 3.7));
        ctx.lineTo((+x) + (+w) - p_val(w, 4.1), (+y) + (+h) - p_val(w, 3.7));
        ctx.lineTo((+x) + (+w) - p_val(w, 4.85), (+y) + (+h) - p_val(w, 4.45) );
        ctx.lineTo((+x) + (+w) - p_val(w, 4.85), (+y) + p_val(w, 4.5));
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = ls[0];
        ctx.lineTo((+x) + (+w) - p_val(w, 5.6), y + p_val(w, 5.2));
        ctx.lineTo((+x) + (+w) - p_val(w, 5.6), (+y) + (+h) - p_val(w, 5.2));
        ctx.lineTo((+x) + (+w) - p_val(w, 6.35), (+y) + (+h) - p_val(w, 5.95) );
        ctx.lineTo((+x) + (+w) - p_val(w, 6.35), (+y) + p_val(w, 5.95));
        ctx.fill();

        // ----------------------------------------bottom
        ctx.beginPath();
        ctx.fillStyle = ds[1];
        ctx.moveTo(x + p_val(w, 4.1), (+y) + (+h) - p_val(w, 3.7));
        ctx.lineTo((+x) + (+w) - p_val(w, 4.1), (+y) + (+h) - p_val(w, 3.7));
        ctx.lineTo((+x) + (+w) - p_val(w, 4.85), (+y) + (+h) - p_val(w, 4.45));
        ctx.lineTo(x + p_val(w, 4.85), (+y) + (+h) - p_val(w, 4.45));
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = ls[0];
        ctx.moveTo(x + p_val(w, 5.6), (+y) + (+h) - p_val(w, 5.2));
        ctx.lineTo((+x) + (+w) - p_val(w, 5.6), (+y) + (+h) - p_val(w, 5.2));
        ctx.lineTo((+x) + (+w) - p_val(w, 6.35), (+y) + (+h) - p_val(w, 5.95));
        ctx.lineTo(x + p_val(w, 6.35), (+y) + (+h) - p_val(w, 5.95));
        ctx.fill();
    }


    function window_shadow(x, y, w, h, p_spacing, ls, ds, pp_count){
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.strokeRect(x+ p_val(w, 5), y+ p_val(w, 5), w - p_val(w, 9), h - p_val(w, 9));
        ctx.stroke();

        glass_section(x + p_val(w, 4.1), y + p_val(w, 3.7), w-p_val(w, 8.2), h-p_val(w, 7.4));

        if(selectedWindow != 'clear'){
            w_shadow(x, y, w, h, ls, ds);
        }
        

        if(selectedWindow == 'madeira' || selectedWindow == 'danube' || selectedWindow == 'thames' || selectedWindow == 'seine'){
            decratrim_madeira(x + p_val(w, 5.5), y + p_val(w, 5), w - p_val(w, 11), h - p_val(w, 10), ls, ds, pp_count);
        } 
        else if(selectedWindow == 'nile'  || selectedWindow == 'rhine'){
            decratrim_thick((x + p_val(w, 4.1)), (y + p_val(w, 3.7)), (w - p_val(w, 8.2)), (h - p_val(w, 7.4)), ls, ds);
        }        
    }


    // -------------------------------------------------------------------------------------------

    function createWindow(x_pos, y, h, l_shade, d_shade, pp_count){
        var pp_width = convert_sizes_inch(panelsPair_width).toFixed(3);
        var pPair_spacing = convert_sizes_inch(pairOfPanels_spacing[w_ft]).toFixed(3); 
        var pPair_count = panel_pairs[w_ft];
        
        window_shadow(x_pos, y, pp_width, h, pPair_spacing, l_shade, d_shade, pp_count);
        window_base(x_pos, y, pp_width, h, pPair_spacing, l_shade, d_shade); 
    }

    //--------------------------------------------------------------------------------------------

    function create_nb_stamp(x, y , w, h, ls, ds, s_count, p_count, pp_width){
        var x_pos = x;
        var s_width = (w/4);
        for(s = 0; s<4; s++){

            if(selectedWindow == 'closed arch'){
                if(s_count == 1){
                    stamp_inner_outline(x_pos, y , s_width - p_val(w, 5), h, ls, ds, p_count, s, pp_width);
                    stamp_shadow_nb(x_pos+1, y+p_val(w, 0.5), s_width-p_val(w, 5.5), h-p_val(w, 0.5), ls, ds, p_count, s_count, s);   
                }
                else{
                    stamp_outline(x_pos, y, s_width - p_val(w, 5), h, ls, ds); 
                    stamp_shadow(x_pos+1, y+p_val(w, 0.5), s_width-p_val(w, 5.5), h-p_val(w, 0.5), ls, ds, s_count);   
                }
            }
            else{
                stamp_outline(x_pos, y, s_width - p_val(w, 5), h, ls, ds);
                stamp_shadow(x_pos+1, y+p_val(w, 0.5), s_width-p_val(w, 5.5), h-p_val(w, 0.5), ls, ds, s_count);
            }
            
            

            x_pos = (+x_pos) + (+s_width) + p_val(w, 1.7);
        }
        
    }


    function create_stamp(x, y, w, h, s_count, section_count){
        
        var p_width = convert_sizes_inch(panel_width).toFixed(3);
        var pPair_count = panel_pairs[w_ft];
        var pp_width = convert_sizes_inch(panelsPair_width).toFixed(3);
        var pPair_spacing = convert_sizes_inch(pairOfPanels_spacing[w_ft]).toFixed(3); 
        var p_spacing = convert_sizes_inch(panel_spacing).toFixed(3);

        var p_sec = pp_width ;
        
        var x_pos = (+x);
        if(selectedPanel =='Tuscany' || selectedPanel == 'Lucern' || selectedPanel == 'Santiago' || selectedPanel == 'Valencia' || selectedPanel == 'Cortana'){            
            for(s1 = 1; s1<= pPair_count; s1++){  
                if(s_count == 1){
                    if(selectedGlassType !='closed'){
                        createWindow(x_pos, y, h, lighter_shades, darker_shades, s1); 
                    }
                    else{
                        if(selectedWindow == 'closed square' ){
                            if(selectedPanel == 'Cortana'){
                                stamp_outline(x_pos, y, pp_width, h, lighter_shades, darker_shades);
                                stamp_shadow(x_pos, y, pp_width, h, lighter_shades, darker_shades, s_count);
                            }
                            else{
                                pair_of_stamps(x_pos, y, p_sec, h, s_count, s1, section_count);  
                            }                            
                        }
                        else if(selectedWindow == 'closed arch'){
                            pair_of_ArchedStamps(x_pos, y, p_sec, h, s_count, s1);  
                        }
                    }
                }
                else{
                    if(selectedPanel == 'Cortana'){
                        stamp_outline(x_pos, y, pp_width, h, lighter_shades, darker_shades);
                        stamp_shadow(x_pos+p_val(pp_width, 0.5), y+p_val(pp_width, 0.5), pp_width, h, lighter_shades, darker_shades, s_count);
                    }
                    else{
                        pair_of_stamps(x_pos, y, p_sec, h, s_count, s1, section_count);              
                    }
                }
                x_pos = (+x_pos) + (+pp_width) + (+pPair_spacing); 
                
            }
        }
        
        else if(selectedPanel == 'Northampton' || selectedPanel == 'Bordeaux'){
            for(ps = 1; ps<=pPair_count; ps++){
                if(s_count == 1){
                    if(selectedGlassType !='closed'){                        
                        createWindow(x_pos, y, h, lighter_shades, darker_shades, ps); 
                    }
                    else{
                        if(selectedWindow == 'closed square'){
                            stamp_outline(x_pos, y, pp_width, h, lighter_shades, darker_shades);
                            create_nb_stamp(x_pos + p_val(pp_width, 0.5), y + p_val(pp_width, 0.5), pp_width - p_val(pp_width, 1.2), h - p_val(pp_width, 1.2), lighter_shades, darker_shades, s_count, ps, pp_width);
                        }
                        else if(selectedWindow == 'closed arch'){
                            stamp_outline_nb(x_pos, y, pp_width, h, lighter_shades, darker_shades, ps);
                            create_nb_stamp(x_pos + p_val(pp_width, 0.5), y + p_val(pp_width, 0.5), pp_width - p_val(pp_width, 1.2), h - p_val(pp_width, 1.2), lighter_shades, darker_shades, s_count, ps, pp_width);
                        }
                    }
                }
                else{
                    stamp_outline(x_pos, y, pp_width, h, lighter_shades, darker_shades);
                    create_nb_stamp(x_pos + p_val(pp_width, 0.5), y + p_val(pp_width, 0.5), pp_width - p_val(pp_width, 1.2), h - p_val(pp_width, 1.2), lighter_shades, darker_shades, s_count, ps, pp_width);                    
                }    
                x_pos = (+x_pos) + (+pp_width) + (+pPair_spacing);
            }
        }

    }

    function stamp_area(sh_list, d_width){
        var sec_count = sh_list['s_count'];
        var s_height = sh_list['s_height'];
        var r_height = sh_list['r_height'];
        var sp_height = sh_list['panel_height'];


       
        var x_pos = convert_sizes_inch(endStile_spacing[w_ft]).toFixed(3);
        var y_pos = r_height;
        var sp_width = d_width - (2*x_pos); 
        
        var p_hght = 0;

        // --- create stamp area in each section
        for(d = 1; d<=sec_count; d++){  
            if(sp_height.length == 1){
                p_hght = sp_height[0];               
            }
            else if(sp_height.length == 2){
                if(h_ft=="06' 02" || h_ft=="06' 05" || h_ft=="06' 10" || h_ft=="07' 01" || h_ft=="07' 08" || h_ft=="08' 06" || h_ft=="08' 09" || h_ft=="09' 06" || h_ft=="09' 09" || h_ft=="10' 04" || h_ft=="10' 10" || h_ft=="11' 01" || h_ft=="12' 02" || h_ft=="12' 05" || h_ft=="13' 00" || h_ft=="13' 02" || h_ft=="13' 05"){
                    if(d == 1){
                        p_hght = sp_height[0];
                    }
                    else{
                        p_hght = sp_height[1];
                    }                    
                }
                else if(h_ft=="07' 04" ){
                    if(d == 1){
                        p_hght = sp_height[1];
                    }
                    else{
                        p_hght = sp_height[0];
                    }
                }
                else if(h_ft=="09' 08" || h_ft=="12' 00"){
                    if(d==sec_count){
                        p_hght = sp_height[1];
                    }
                    else{
                        p_hght = sp_height[0];
                    }
                }
                else if(h_ft=="10' 00"|| h_ft=="12' 08"){
                    if(d==1 || d==2){
                        p_hght = sp_height[0];
                    }
                    else{
                        p_hght = sp_height[1];
                    }
                }  
                else if(h_ft=="12' 04" ){
                    if(d==sec_count || d==(sec_count-1)){
                        p_hght = sp_height[1];
                    }
                    else{
                        p_hght = sp_height[0];
                    }
                }              
            }
            else if(s_height.length == 3){
                if(h_ft=="06' 06" || h_ft=="08' 10" || h_ft=="11' 02" || h_ft=="06' 09" || h_ft=="09' 01" || h_ft=="11' 05"){
                    if(d==1){
                        p_hght = sp_height[0];
                    }
                    else if(d==sec_count){
                        p_hght = sp_height[2];
                    }
                    else{
                        p_hght = sp_height[1];
                    }
                }
                else if(h_ft=="09' 02" || h_ft=="11' 06" || h_ft=="09' 05" || h_ft=="11' 09"){
                    if(d==1){
                        p_hght = sp_height[0];
                    }
                    else if(d==sec_count || d==(sec_count-1)){
                        p_hght = sp_height[2];
                    }
                    else{
                        p_hght = sp_height[1];
                    }
                }
                else if(h_ft=="11' 10" || h_ft=="12' 01"){
                    if(d==1){
                        p_hght = sp_height[0];
                    }
                    else if(d==2){
                        p_hght = sp_height[1];
                    }
                    else{
                        p_hght = sp_height[2];
                    }
                }
                else if(h_ft=="13' 06"){
                    if(d==1){
                        p_hght = sp_height[2];
                    }
                    else if(d==2){
                        p_hght = sp_height[0];
                    }
                    else{
                        p_hght = sp_height[1];
                    }
                }
            }


            create_stamp(x_pos, y_pos, sp_width, p_hght, d, sec_count);
            
            y_pos = y_pos + p_hght + (2*r_height) + 2;
        }
        
    }


    



    // -----------------------------------------------------------------

    if(canvas.width && canvas.height){ 
        var d_width = canvas.width;
        var d_height = canvas.height-4;

        door_area(d_width, d_height, base_color);  

        section_divider(s_height_list, lighter_shades, darker_shades);

        if(selectedPanel){
            stamp_area(s_height_list, d_width);
        }      

        bottom_line();

    }


    // --------------------- bottom section --------------------------
    function bottom_line(){
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.fillRect(0, canvas.height-bottom_border, canvas.width, bottom_border);
        ctx.fill();
    }
    
    var endtime = performance.now();
}