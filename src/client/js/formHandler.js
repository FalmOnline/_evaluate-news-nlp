import { json } from "body-parser";

async function handleSubmit(event) {
    event.preventDefault()
    console.log('0');
    // check what text was put into the form field
    let formText = document.getElementById('text').value
    
    await Client.getAnalysis(formText);


    console.log("::: Form Submitted 1 :::")
    fetch('http://localhost:8081/getmydata')
    .then(res => res.json())
    .then(function(data) {
        console.log(data);
        console.log('7');
        document.getElementById('results').innerHTML = 
        `   <div>Agreement: ${data.agreement}</div>
            <div>Irony: ${data.irony}</div>
            <div>Subjectivity: ${data.subjectivity}</div>
            <div>Confidence: ${data.confidence}</div>
        `
    })
    .catch(err => {
        console.error(err);
    })
}

export { handleSubmit }
