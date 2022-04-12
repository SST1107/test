$(function(){
    var currentQuiz=null;   
    //紀錄作答至第幾題
    //按下按鈕
    $("#startButton").on("click",function(){
        if(currentQuiz==null){
            currentQuiz=0; //第0題開始
            $("#question").text(questions[0].question);//顯示題目
            $("#options").empty();//選項清空
            //選項加入
            questions[0].answers.forEach(function(element,index,array){
                $("#options").append(`<input name='options' type='radio' value='${index}'><label>${element[0]}</label><br><br>`);
            });
                $("#startButton").attr("value","Next");   //改變按鈕文字
        }
        //已經開始作答從此開始
        else{   
            //哪個選項被選到
            $.each($(":radio"),function(i,val){
                if(val.checked){
                    //是不是最後結果(A~D)
                    if(isNaN(questions[currentQuiz].answers[i][1])){
                        //通往最後結果
                        var finalResult=questions[currentQuiz].answers[i][1];
                        //結果標題
                        $("#question").text(finalAnswers[finalResult][0]);
                        $("#options").empty();
                        //結果內容
                        $("#options").append(`${finalAnswers[finalResult][1]}<br><br>`);
                        currentQuiz=null;
                        $("#startButton").attr("value",重新開始);
                    }
                    else{
                        //指定下一題，原始資料從1開始，所以要-1
                        currentQuiz=questions[currentQuiz].answers[i][1]-1;
                        //顯示新的題目
                        $("#question").text(questions[currentQuiz].question);
                        $("#options").empty();
                        questions[currentQuiz].answers.forEach(function(element,index,array){
                            $("#options").append(`<input name='options' type='radio' value='${index}'><label>${element[0]}</label><br><br>`);
                        });
                    }
                    return false;
                }
            });
        }
    });

});