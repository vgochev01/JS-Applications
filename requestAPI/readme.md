# Custom Request API

**It's designed to work with SoftUni Practice Server**

#### Request Function
* Params (URL, Options)
* Error Handling
    * If request fails - catch and throw the same error
    * If response.json() fails - return response
* Return - response.json()

* createOptions(method, data)
    _Returns an object:_ 
     * Method - GET as default
     * Headers:
        * Content-Type - if data is not undefined
        * X-Authorization - if token is stored in session
    * body - (if data) data as json

#### CRUD Functions
###### Pass received url & options to request()
* get(url)
* post(url, createOptions('post', data)) - authorized
* put(url, createOptions('put', data)) - authorized
* del(url, createOptions('delete')) - authorized

#### Authentication
###### Register can receive optional params (username, gender etc)
* login(email, password) - makes a POST request to **/users/login using API.post() - returns response.json()
* register(email, password) - makes a POST request to **/users/register using API.post() - returns response.json()
* logout() - makes authorized GET request to **/users/logout - returns empty response
     
