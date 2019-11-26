import React from 'react';

class App extends React.Component{

  getData() {
      fetch("http://localhost/zaparkujfure/pai_backend/public/index.php/home")
          .then(resp => resp.json())
          .then(resp => {
              console.log(resp)
          })
  }
  render() {
      this.getData();
      return (
        <div>
            Hello World
        </div>
      )
  };
}

export default App;
