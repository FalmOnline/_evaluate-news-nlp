
async function getAnalysis(inputText) {  
    console.log('1');
    //Inside that callback function call your async GET request with the parameters:

    await analysisAPI(inputText)
    .then(function(data) {
      console.log('4');
      let json = {
        'agreement': data.agreement,
        'irony': data.irony,
        'subjectivity': data.subjectivity,
        'confidence': data.confidence,
      }

    postData('http://localhost:8081/mydata', json);


    console.log(json);
    console.log('6');

     return json;

    })
}


const analysisAPI = async(inputText) => {
    console.log("::: Running checkForText :::", inputText);
    console.log('2');

    const formdata = new FormData();
    formdata.append("key", '1105a42b3ce77d392c09d6e3a91a6982');
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
        console.log('3');
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
    console.log(newData);
    console.log('5');
    return newData;

	} catch(error) {
		console.log("error", error);
	}
}


export { getAnalysis }