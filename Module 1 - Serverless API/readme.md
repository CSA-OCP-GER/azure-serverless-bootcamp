# Module 1 - Serverless API

As part of BFYOC ice cream services they need to keep each franchise and branch connected with the catalogue of flavors that they offer.  As such you need a callable API each store and supporting systems can call for details on flavors offered.  

This module will walk you through building and testing your first Azure Function locally, and publishing to the cloud.  The Azure Function will be the serverless API to expose the data on the different flavors that you offer.

## Pre-requisites

* A modern laptop running Windows 10, Mac OSX Mac OS X 10.12 or higher
* Your preferred IDE (integrated development environments) - Visual Studio Code or Visual Studio
    > NOTE: While you can complete this entire workshop in any language and editor you prefer, to make applicable to as many operating systems as possible most of the samples and examples will assume VS Code + JavaScript.

    * If using Visual Studio Code in Windows, OSX, or Linux make sure you have the latest Visual Studio Code version for your OS. You can follow [the **first page** of pre-requisites as described here](https://code.visualstudio.com/tutorials/functions-extension/getting-started){:title="Function extension"}{:target="_blank"} to get the Azure Functions extension configured

    * If using Visual Studio for in Windows, make sure you have the [latest Visual Studio 2017 or 2019](a href="https://www.visualstudio.com/vs/") with the `Azure development workload` selected.  
  
* [.NET 5](https://www.microsoft.com/net/download)
* [NodeJS 14 (LTS) or 16 (Current)](https://nodejs.org/en/download/)
* [Azure Functions Core Tools v3](https://github.com/Azure/azure-functions-core-tools#installing)  

>Hint:
You can install all of these needed software by using [winget](https://docs.microsoft.com/windows/package-manager/winget/)

## Challenge

Run and test an Azure Function locally where you can do a `GET` on a specific endpoint and pass in a product ID.  The product ID will return information on the product flavor.  For example if you did the following HTTP Request:

```bash
GET http://{myFunctionEndpoint}/api/products?id=1
```

It would return:

```json
{
  "id": "1",
  "flavor": "Rainbow Road",
  "price-per-scoop": 3.99
}
```

For this challenge, just have the function return static data.  No need to connect to a database behind the scenes.

You or your team must be able to show this function running locally and published to Azure.

**You should be writing this function in the latest v3 runtime. If non-Windows this is only option, if Windows be sure to select in Visual Studio or VS Code (may be listed as `beta`).**

### Tips

1. First things first, make sure you get the tools installed listed above.  
1. Create a new Azure Function project and select the HTTP template.
    * The HTTP function template will return "Hello, {name}", where name is a property passed in to a query parameter or as the body.
    * Make changes to the HTTP template so instead of returning "Hello, {name}" it returns the above `json` payload when a query parameter `id` is set to `1`.
1. Check out the [documentation](#documentation) for more guidance

### Guided instructions
<!-- markdownlint-disable MD032 MD033 -->
<details><summary>Click to open</summary><p>

1. Open Visual Studio Code
1. Click on the extensions category on the left-hand nav and verify or install the **Azure Functions** extension (this may require restarting code)
1. Click on the **Azure** category on the left-hand nav
1. Open the **Functions** extension and verify you are signed into an Azure account
1. Click the folder icon to create a new project - it will prompt you to select a folder to create the app in
1. Choose a runtime if you are prompted, and select "JavaScript" for the language
1. Click the lightning bolt icon in the Azure Functions extension to add a function to this app.  Select **HTTP Trigger** for the trigger.  Give it any name you like (I'll name "products")
1. Select **Anonymous** for the authentication type.  **Function** would also work but requires a key is passed in a header or query parameter to execute the function once published.
1. You should now see a default Azure Functions template like the following:

    ```javascript
    module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
    }
    ```

    >IMPORTANT: If you don't see this template you may be targeting the wrong runtime (wouldn't have the `async` modifier on the method) or using an out of date version of function core tools / extension

1. Make the following changes so that your function returns the suggested string:

    ```javascript
    module.exports = async function (context, req) {
        context.log('JavaScript HTTP trigger function processed a request.');
    
        if (req.query.id) {
            if (req.query.id == "1") {
                context.res = {
                    status: 200,
                    body: {
                        id: "1",
                        flavor: "Rainbow Road",
                        "price-per-scoop": 3.99
                    }
                }
            }
        }
        else {
            context.res = {
                status: 400,
                body: "Please pass in an id query parameter"
            }
        }
    };
    ```

    You may also notice in the file browser next to your `index.js` file there is a `function.json` file. Go ahead and open this and look. It describes the trigger you are using, and any bindings.  It should be set for HTTPTrigger.

1. Click **Run** at the top and **Start Debugging**

    You should notice the Azure Functions runtime spins up in the terminal window.  If all the code is valid you should be prompted with a URL to call to execute the function.  Something like `http://localhost:7071/api/products`

1. While the runtime is still running, click on the link or copy it to a browser to execute the function.  Make sure you append a query parameter for ID as specified.  So the call should be like `http://localhost:7071/api/products?id=1`.  You should see a response like the following returned:

    ```json
    {
        "id": "1",
        "flavor": "Rainbow Road",
        "price-per-scoop": 3.99
    }
    ```

1. The final step is publishing this app to Azure.  Kill the terminal (click the trash icon) to stop the runtime, and open the Azure Functions extension.
1. Click the **"deploy to azure"** icon in the Functions extension to publish, and select this app in the list.  Choose to **Create New Function App** and give it a *globally* unique name and follow the dialog.

>INFO: Use the advanced Option of the create a new function app, to define more parameters of the deployment like the resource group ofr example.

1. You should see a prompt in the bottom right that the app is publishing.  Once the app is published you should be able to open your subscription and see the function.  You should be able to open the app and this HTTP function you have just created.  Click the **Get function URL** link in the function to get a URL, and validate you can invoke it and it executes in the cloud. (Be sure to append the query parameter)

Congratulations! You've now published an Azure Function as an API in the cloud.

</p></details>

## Documentation

* <a href="https://docs.microsoft.com/en-us/azure/azure-functions/functions-overview" target="_blank">An introduction to Azure Functions</a>
* <a href="https://docs.microsoft.com/en-us/azure/azure-functions/functions-test-a-function" target="_blank">Strategies for testing your code in Azure Functions</a>
* <a href="https://code.visualstudio.com/tutorials/functions-extension/getting-started" target="_blank">Creating Azure Functions from Visual Studio Code</a> - this tutorial is for JavaScript but it is very similar for C#
* <a href="https://docs.microsoft.com/en-us/azure/azure-functions/functions-develop-local" target="_blank">Code and test Azure Functions locally</a>
* <a href="https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local" target="_blank">Code and test Azure Functions locally</a>
