
async function getAnalysis(inputText) {  
    //Inside that callback function call your async GET request with the parameters:

    await analysisAPI(inputText)
    .then(function(data) {
      let json = {
        'agreement': data.agreement,
        'irony': data.irony,
        'subjectivity': data.subjectivity,
        'confidence': data.confidence,
      }

     return json;

    }).then(function (json) {
        return postData('http://localhost:8081/mydata', json);
      });
}


const analysisAPI = async(inputText) => {

    const mykey = await fetch('http://localhost:8081/apikey')
    .then(response => response.json())
    .then(data => data.key);

    const formdata = new FormData();
    formdata.append("key", mykey);
    formdata.append("txt", inputText);
    formdata.append("lang", "en");  // 2-letter code, like en es fr ...

    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    const res = await fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions);

    try {
        const data = await res.json();
        return data;
  
      }  catch (error) {
        console.log("error", error);
        // appropriately handle the error
      }

}


// // Make POST request
const postData = async ( url = 'http://localhost:8081/mydata', data = {})=> {

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    // Body data type must match "Content-Type" header      
    body: JSON.stringify(data), 
    });

	try {
		const newData = await response.json();
    return newData;

	} catch(error) {
		console.log("error", error);
	}
}


export { getAnalysis }
export { analysisAPI }
export { postData }