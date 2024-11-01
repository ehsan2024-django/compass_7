#Use slim Python image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PIP_DEFAULT_TIMEOUT=300

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        gcc \
        python3-dev \
        && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Upgrade pip and install wheel first
RUN pip install --upgrade pip && \
    pip install wheel
# Copy requirements file
COPY requirements.txt .

# Install dependencies one by one with verbose output
RUN pip install --verbose Django==5.1.2 && \
    pip install --verbose asgiref==3.7.2 && \
    pip install --verbose et_xmlfile==2.0.0 && \
    pip install --verbose gunicorn==23.0.0 && \
    pip install --verbose numpy==1.26.4 && \
    pip install --verbose openpyxl==3.1.5 && \
    pip install --verbose packaging==24.1 && \
    pip install --verbose pandas==2.2.3 && \
    pip install --verbose python-dateutil==2.9.0.post0 && \
    pip install --verbose pytz==2024.2 && \
    pip install --verbose six==1.16.0 && \
    pip install --verbose sqlparse==0.5.1 && \
    pip install --verbose tzdata==2024.1 && \
    pip install --verbose whitenoise==6.7.0

# Copy project files
COPY . .

# Expose port
EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
