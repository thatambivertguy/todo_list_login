$(()=>{
    // $.post('/todos',{
    //     task : $(".txtb").val()
    // },
    // (data)=>{
    //     console.log(data)
    //     refresh(data)
    // }
    // )
    $(".txtb").on("keyup",function(e){
        //13  means enter button
        if(e.keyCode == 13 && $(".txtb").val() != "")
        { 
            $.post('/todos',{
                task : $(".txtb").val()
            },
            (data)=>{
                console.log(data)
                refresh(data)
            }
            )}
            

      });
      function refresh(todo){
        $('.notcomp2').empty()  
        todo.forEach(t=>{
                var task = $("<div class='task'></div>").text(t.task);
            var del = $("<i class='fas fa-trash-alt'></i>").click(function(){
                
                
              var p = $(this).parent();
              var tas1k = p[0].innerText
                $.post('/todo-del',{
                    task : tas1k
                },
                (data)=>{
                    console.log(data)
                }
                )
                p.fadeOut(function(){
                p.remove();
              });
            });
    
            var check = $("<i class='fas fa-check'></i>").click(function(){
              var p = $(this).parent();
              var cotask = p[0].innerText
                $.post('/todo-com',{
                    task : cotask
                },
                (data)=>{
                    console.log(data)
                }
                )
              
              
              p.fadeOut(function(){
                $(".comp").append(p);
                p.fadeIn();
              });
              $(this).remove();
            });
    
            task.append(del,check);
            $(".notcomp2").append(task);
              //to clear the input
            $(".txtb").val("");
          })
        
            }
     $.post('/todos',{
        task : $(".txtb").val()
    },
    (data)=>{
        console.log(data)
        refresh(data)
    }
    )
})