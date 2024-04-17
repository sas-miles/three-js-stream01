# Levels

Starter Template by Miles 

**Tailored for Webflow & Three JS Projects**

# Credits

**The people and teams that helped piece this together:**

* Dev and Prod workflow based on Finsweet Dev Starter and comes packaged with finsweet-ts utils for accessing Webflow objects. 

* Three JS OOP structure and Event Emitter class based on Bruno Simon Three JS Journey Course. 

# Overview

Vite vanilla JS starter 

Three JS with GLSL and shader folder setup and sample scene. 

Barba.js for SPA experience 

GSAP for animations

# Webflow Global Script Embed 

```html
<script>
    function loadScript(src) {
        console.log(`Loading script from: ${src}`);
        var script = document.createElement('script');
        script.src = src;
        document.head.appendChild(script);
        script.onload = () => console.log(`Script loaded successfully from: ${src}`);
        script.onerror = () => console.log(`Failed to load script from: ${src}`);
    }

    fetch('http://localhost:3000/main.js')
        .then(response => {
            if (response.ok) {
                // If localhost is running, load the script from there
                console.log('Localhost server is running.');
                loadScript('http://localhost:3000/main.js');
            } else {
                // If localhost is not running, load the external script
                console.log('Localhost server not running, loading external script if available');
                loadScript('#');
            }
        })
        .catch(error => {
            // If the fetch fails (e.g., server not running), load the external script
            console.error('Error fetching localhost script:', error);
            console.log('Loading external script due to error.');
            loadScript('#');
        });
</script>
```

# CORS config

```json 
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET"
        ],
        "AllowedOrigins": [
            "https://*.webflow.io"
        ],
        "ExposeHeaders": [],
        "MaxAgeSeconds": 10000
    }
] 
```
