# Step 1: Use a lightweight Python base image to save build time and disk space
FROM python:3.9-slim

# Step 2: Set the working directory inside the Docker container
WORKDIR /app

# Step 3: Copy just the requirements first (this caches the install step to make future rebuilds faster)
COPY requirements.txt .

# Step 4: Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Step 5: Copy the rest of your application code (app.py, templates folder, etc.)
COPY . .

# Step 6: Expose the port Render expects
EXPOSE 10000

# Step 7: The Production Server Command
# -w 1 : One worker process (keeps RAM usage under 512MB)
# --threads 4 : Four threads (allows handling multiple students simultaneously)
# app:app : Looks for the 'app' object inside the 'app.py' file
CMD ["gunicorn", "--bind", "0.0.0.0:10000", "-w", "1", "--threads", "4", "app:app"]