# Use the official NGINX image as the base image
FROM nginx:alpine

# Copy the HTML, CSS, and JS files to the NGINX html directory
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY favicon-32x32.png /usr/share/nginx/html/
# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]