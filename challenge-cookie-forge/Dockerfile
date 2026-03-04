# Step 1: Lightweight base image
FROM python:3.9-slim

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Step 4: Copy the rest of the app (app.py and templates/)
COPY . .

# Step 5: Expose the Render default port
EXPOSE 10000

# Step 6: The Production Server Command for 100 students
# -w 1 : One worker to respect the 512MB RAM limit
# --threads 4 : Four concurrent threads to prevent bottlenecks
CMD ["gunicorn", "--bind", "0.0.0.0:10000", "-w", "1", "--threads", "4", "app:app"]