function window_row(){ 
  
    var door_height = document.getElementById('door_h').value;
    var door_secs = document.getElementById('win_row');
    var ds_elements = document.createElement("option");
    var door_window = document.getElementById("window");
    var door_sections = 0;
    if(door_height<=7){
      door_sections = 4;
    }
    else if(door_height>7 && door_height<9 ){
      door_sections = 5;
    }
    else if(door_height>=9 && door_height<=10.6 ){
      door_sections = 6;
    } 
    else if(door_height>=10.9 && door_height <=12){
      door_sections = 7;
    } 
    else if(door_height==14 ){
      door_sections = 8;
    }

    if(door_sections){     
      var m=0;    
      
      door_secs.length = 1;
      for(m = door_sections; m>0; m--){
        door_secs.options[door_secs.options.length] = new Option(m, m);
      }
      
    }
  }


  