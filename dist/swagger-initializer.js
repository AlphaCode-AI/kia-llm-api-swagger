window.onload = function() {
  //<editor-fold desc="Changeable Configuration Block">

  // the following lines will be replaced by docker/configurator, when it runs in a docker-container
  window.ui = SwaggerUIBundle({
    url: "./swagger.yaml",
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout",
    requestInterceptor: (req) => {
      const headerKey = localStorage.getItem('headerKey');
      if (headerKey) {
        req.headers['API-Key'] = headerKey;
      }
      return req;
    },
    onComplete: function() {
      const operations = document.querySelectorAll('.opblock');
      operations.forEach(op => {
        const headerInputDiv = document.createElement('div');
        headerInputDiv.innerHTML = `
          <input type="text" placeholder="Enter Header Key" class="header-key-input" />
          <button class="set-header-button">Set Header</button>
        `;
        op.querySelector('.opblock-summary').appendChild(headerInputDiv);

        headerInputDiv.querySelector('.set-header-button').addEventListener('click', function() {
          const headerKey = headerInputDiv.querySelector('.header-key-input').value;
          localStorage.setItem('headerKey', headerKey);
          alert('Header key set: ' + headerKey);
        });
      });
    }
  });

  //</editor-fold>
};
