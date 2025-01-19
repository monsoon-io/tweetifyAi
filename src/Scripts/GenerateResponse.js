async function generateResponse(){

    setIsResLoading(true);

    let prompt = 'Generate a tweet about '
    prompt = prompt.concat(reqText);
    prompt = prompt.concat(' within the character limit of ').concat(charLim);

    if(includeHash){
      prompt = prompt.concat(' include hashtags');
    } else {
      prompt = prompt.concat(' do not include hashtags');
    }

    const response = await axios({
      url:"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCYW5xkgBy-0WMC6PINtQXTaQsBB-8VckM",
      
      method:"post",

      data:{
        "contents": [{
          "parts":[{"text": prompt}]
        }]
      }
    })

    setIsResLoading(false);

    setOutput(response['data']['candidates'][0]['content']['parts'][0]['text']);
}