# Use a lightweight Python image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Install Flask
RUN pip install --no-cache-dir flask

# Copy all the files into the container
COPY . .

# Expose the port the app runs on
EXPOSE 10000

# Command to run the application
CMD ["python", "app.py"]