# Usage Examples and Tutorials

## Overview

This document provides practical examples and tutorials for using all public APIs, functions, and components in the project. Currently, no code is implemented, but this serves as a template for documenting real-world usage scenarios as the codebase grows.

## Table of Contents

1. [Quick Start Examples](#quick-start-examples)
2. [Basic Usage Patterns](#basic-usage-patterns)
3. [Advanced Usage Scenarios](#advanced-usage-scenarios)
4. [Integration Examples](#integration-examples)
5. [Error Handling Examples](#error-handling-examples)
6. [Performance Optimization](#performance-optimization)
7. [Best Practices](#best-practices)
8. [Common Patterns](#common-patterns)
9. [Troubleshooting](#troubleshooting)

## Quick Start Examples

### Basic Application Setup

```python
"""
Quick start example showing basic application setup and usage.
This example demonstrates the minimal code needed to get started.
"""

# Import the main application class
from python import Application, ConfigManager

def quick_start_example():
    """Basic application setup example."""
    
    # Initialize configuration manager
    config = ConfigManager()
    config.load_from_file("config.json")
    
    # Create and start application
    app = Application(config_path="config.json")
    app.start()
    
    print(f"Application running: {app.is_running}")
    
    # Stop application
    app.stop()
    print("Application stopped")

if __name__ == "__main__":
    quick_start_example()
```

### Simple Function Usage

```python
"""
Example showing basic function usage patterns.
"""

from python import (
    sanitize_string,
    validate_email,
    safe_divide,
    transform_data
)

def basic_function_examples():
    """Demonstrate basic function usage."""
    
    # String utilities
    clean_text = sanitize_string("Hello, World! @#$")
    print(f"Sanitized: {clean_text}")  # Output: "Hello World"
    
    # Email validation
    is_valid = validate_email("user@example.com")
    print(f"Email valid: {is_valid}")  # Output: True
    
    # Safe division
    result = safe_divide(10, 0, default=-1)
    print(f"Division result: {result}")  # Output: -1
    
    # Data transformation
    data = [1, 2, 3, 4, 5]
    squared = transform_data(data, "square")
    print(f"Squared data: {squared}")  # Output: [1, 4, 9, 16, 25]

if __name__ == "__main__":
    basic_function_examples()
```

## Basic Usage Patterns

### Working with Data Models

```python
"""
Examples of working with data models and classes.
"""

from python import User, BaseModel
from datetime import datetime

def data_model_examples():
    """Demonstrate data model usage patterns."""
    
    # Create a new user
    user = User(
        id=1,
        name="John Doe",
        email="john@example.com",
        is_active=True,
        created_at=datetime.now()
    )
    
    # Validate user data
    if user.validate():
        print("User data is valid")
    
    # Convert to dictionary
    user_dict = user.to_dict()
    print(f"User dict: {user_dict}")
    
    # Create user from dictionary
    new_user = User.from_dict(user_dict)
    print(f"New user: {new_user.name}")
    
    # Email validation
    if user.is_valid_email():
        print("Email format is valid")
    
    # Deactivate user
    user.deactivate()
    print(f"User active: {user.is_active}")

if __name__ == "__main__":
    data_model_examples()
```

### Configuration Management

```python
"""
Examples of configuration management patterns.
"""

from python import ConfigManager

def configuration_examples():
    """Demonstrate configuration management."""
    
    # Initialize config manager
    config = ConfigManager()
    
    # Load configuration from file
    config.load_from_file("app_config.json")
    
    # Get configuration values
    db_host = config.get("database.host", "localhost")
    db_port = config.get("database.port", 5432)
    debug_mode = config.get("debug", False)
    
    print(f"Database: {db_host}:{db_port}")
    print(f"Debug mode: {debug_mode}")
    
    # Get nested configuration
    api_settings = config.get("api.settings", {})
    rate_limit = api_settings.get("rate_limit", 100)
    
    print(f"API rate limit: {rate_limit}")

if __name__ == "__main__":
    configuration_examples()
```

### Logging Setup

```python
"""
Examples of logging configuration and usage.
"""

from python import Logger, setup_logging

def logging_examples():
    """Demonstrate logging setup and usage."""
    
    # Set up global logging
    setup_logging(level="DEBUG", format_str="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
    
    # Create logger instance
    logger = Logger("my_application")
    
    # Log messages at different levels
    logger.debug("This is a debug message")
    logger.info("Application started successfully")
    logger.warning("This is a warning message")
    logger.error("An error occurred", extra={"user_id": 123, "action": "login"})
    logger.critical("Critical system error")
    
    # Structured logging with context
    user_context = {"user_id": 456, "session_id": "abc123"}
    logger.info("User action performed", **user_context)

if __name__ == "__main__":
    logging_examples()
```

## Advanced Usage Scenarios

### Caching Implementation

```python
"""
Advanced caching patterns and usage scenarios.
"""

from python import CacheManager
import time

def caching_examples():
    """Demonstrate advanced caching patterns."""
    
    # Initialize cache with custom settings
    cache = CacheManager(max_size=1000, default_ttl=300)
    
    # Basic caching
    cache.set("user:123", {"name": "John", "email": "john@example.com"})
    user_data = cache.get("user:123")
    print(f"Cached user: {user_data}")
    
    # Caching with custom TTL
    cache.set("temp_data", "temporary_value", ttl=60)  # 1 minute TTL
    
    # Cache-aside pattern
    def get_user_profile(user_id):
        cache_key = f"profile:{user_id}"
        
        # Try to get from cache first
        profile = cache.get(cache_key)
        if profile is not None:
            print("Cache hit!")
            return profile
        
        # Cache miss - fetch from database (simulated)
        print("Cache miss - fetching from database")
        profile = {"id": user_id, "name": f"User {user_id}", "preferences": {}}
        
        # Store in cache for future use
        cache.set(cache_key, profile, ttl=600)  # 10 minutes
        return profile
    
    # Use the cached function
    profile1 = get_user_profile(123)
    profile2 = get_user_profile(123)  # This should be a cache hit
    
    # Cache statistics
    stats = cache.get_stats()
    print(f"Cache stats: {stats}")

if __name__ == "__main__":
    caching_examples()
```

### Component Architecture

```python
"""
Examples of component-based architecture patterns.
"""

from python import Application, Component
from abc import ABC, abstractmethod

class DatabaseComponent(Component):
    """Example database component implementation."""
    
    def __init__(self, connection_string: str):
        self.connection_string = connection_string
        self.is_connected = False
    
    def initialize(self) -> None:
        """Initialize database connection."""
        print(f"Initializing database connection: {self.connection_string}")
        # Simulate database initialization
        self.is_connected = True
    
    def start(self) -> None:
        """Start database operations."""
        if not self.is_connected:
            self.initialize()
        print("Database component started")
    
    def stop(self) -> None:
        """Stop database operations."""
        print("Database component stopped")
        self.is_connected = False
    
    def is_healthy(self) -> bool:
        """Check database health."""
        return self.is_connected

def component_architecture_example():
    """Demonstrate component architecture."""
    
    # Create application
    app = Application()
    
    # Create and register components
    db_component = DatabaseComponent("postgresql://localhost:5432/mydb")
    app.register_component(db_component)
    
    # Start application (starts all components)
    app.start()
    
    # Check component health
    if db_component.is_healthy():
        print("Database component is healthy")
    
    # Stop application
    app.stop()

if __name__ == "__main__":
    component_architecture_example()
```

### Data Processing Pipeline

```python
"""
Advanced data processing pipeline examples.
"""

from python import DataProcessor, transform_data, validate_data_structure
from typing import Any, List

class NumberProcessor(DataProcessor):
    """Example data processor for numeric data."""
    
    def validate_input(self, data: Any) -> bool:
        """Validate that input is a list of numbers."""
        return isinstance(data, list) and all(isinstance(x, (int, float)) for x in data)
    
    def process(self, data: Any) -> Any:
        """Process numeric data with various transformations."""
        if not self.validate_input(data):
            raise ValueError("Input must be a list of numbers")
        
        # Apply multiple transformations
        scaled_data = transform_data(data, "scale", factor=2)
        squared_data = transform_data(scaled_data, "square")
        
        return {
            "original": data,
            "scaled": scaled_data,
            "squared": squared_data,
            "stats": {
                "count": len(data),
                "sum": sum(squared_data),
                "avg": sum(squared_data) / len(squared_data)
            }
        }

def data_processing_examples():
    """Demonstrate data processing patterns."""
    
    # Create processor
    processor = NumberProcessor()
    
    # Process data
    input_data = [1, 2, 3, 4, 5]
    result = processor.process(input_data)
    
    print(f"Processing result: {result}")
    
    # Pipeline processing
    def create_processing_pipeline(processors: List[DataProcessor]):
        """Create a data processing pipeline."""
        def pipeline(data):
            for processor in processors:
                data = processor.process(data)
            return data
        return pipeline
    
    # Use pipeline
    pipeline = create_processing_pipeline([processor])
    final_result = pipeline([10, 20, 30])
    print(f"Pipeline result: {final_result}")

if __name__ == "__main__":
    data_processing_examples()
```

## Integration Examples

### Web API Integration

```python
"""
Examples of integrating with web APIs and external services.
"""

import requests
from python import Logger, ConfigManager

def web_api_integration_example():
    """Demonstrate web API integration patterns."""
    
    # Setup
    logger = Logger("api_client")
    config = ConfigManager()
    
    # API client class
    class APIClient:
        def __init__(self, base_url: str, api_key: str):
            self.base_url = base_url
            self.api_key = api_key
            self.session = requests.Session()
            self.session.headers.update({"Authorization": f"Bearer {api_key}"})
        
        def get_user(self, user_id: int):
            """Get user data from API."""
            try:
                response = self.session.get(f"{self.base_url}/users/{user_id}")
                response.raise_for_status()
                return response.json()
            except requests.RequestException as e:
                logger.error(f"API request failed: {e}")
                raise
        
        def create_user(self, user_data: dict):
            """Create new user via API."""
            try:
                response = self.session.post(f"{self.base_url}/users", json=user_data)
                response.raise_for_status()
                return response.json()
            except requests.RequestException as e:
                logger.error(f"User creation failed: {e}")
                raise
    
    # Usage
    api_key = config.get("api.key", "your-api-key")
    base_url = config.get("api.base_url", "https://api.example.com")
    
    client = APIClient(base_url, api_key)
    
    # Get user
    user = client.get_user(123)
    logger.info(f"Retrieved user: {user}")
    
    # Create user
    new_user_data = {
        "name": "Jane Doe",
        "email": "jane@example.com"
    }
    created_user = client.create_user(new_user_data)
    logger.info(f"Created user: {created_user}")

if __name__ == "__main__":
    web_api_integration_example()
```

### Database Integration

```python
"""
Examples of database integration patterns.
"""

from python import Logger, ConfigManager
import sqlite3
from contextlib import contextmanager

def database_integration_example():
    """Demonstrate database integration patterns."""
    
    logger = Logger("database")
    config = ConfigManager()
    
    class DatabaseManager:
        def __init__(self, db_path: str):
            self.db_path = db_path
        
        @contextmanager
        def get_connection(self):
            """Context manager for database connections."""
            conn = sqlite3.connect(self.db_path)
            conn.row_factory = sqlite3.Row  # Enable dict-like access
            try:
                yield conn
            except Exception as e:
                conn.rollback()
                logger.error(f"Database error: {e}")
                raise
            else:
                conn.commit()
            finally:
                conn.close()
        
        def create_tables(self):
            """Create database tables."""
            with self.get_connection() as conn:
                conn.execute('''
                    CREATE TABLE IF NOT EXISTS users (
                        id INTEGER PRIMARY KEY,
                        name TEXT NOT NULL,
                        email TEXT UNIQUE NOT NULL,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    )
                ''')
        
        def create_user(self, name: str, email: str):
            """Create a new user."""
            with self.get_connection() as conn:
                cursor = conn.execute(
                    "INSERT INTO users (name, email) VALUES (?, ?)",
                    (name, email)
                )
                return cursor.lastrowid
        
        def get_user(self, user_id: int):
            """Get user by ID."""
            with self.get_connection() as conn:
                cursor = conn.execute(
                    "SELECT * FROM users WHERE id = ?",
                    (user_id,)
                )
                row = cursor.fetchone()
                return dict(row) if row else None
    
    # Usage
    db_path = config.get("database.path", "app.db")
    db_manager = DatabaseManager(db_path)
    
    # Initialize database
    db_manager.create_tables()
    
    # Create user
    user_id = db_manager.create_user("John Doe", "john@example.com")
    logger.info(f"Created user with ID: {user_id}")
    
    # Retrieve user
    user = db_manager.get_user(user_id)
    logger.info(f"Retrieved user: {user}")

if __name__ == "__main__":
    database_integration_example()
```

## Error Handling Examples

### Comprehensive Error Handling

```python
"""
Examples of comprehensive error handling patterns.
"""

from python import (
    BaseApplicationError,
    ValidationError,
    ConfigurationError,
    Logger
)

def error_handling_examples():
    """Demonstrate comprehensive error handling."""
    
    logger = Logger("error_handling")
    
    # Custom exception handling
    def process_user_data(user_data: dict):
        """Process user data with comprehensive error handling."""
        try:
            # Validate required fields
            required_fields = ["name", "email", "age"]
            missing_fields = [field for field in required_fields if field not in user_data]
            
            if missing_fields:
                raise ValidationError(
                    f"Missing required fields: {missing_fields}",
                    error_code="USER_001",
                    details={"missing_fields": missing_fields}
                )
            
            # Validate email format
            email = user_data["email"]
            if "@" not in email:
                raise ValidationError(
                    "Invalid email format",
                    error_code="USER_002",
                    details={"email": email}
                )
            
            # Validate age
            age = user_data["age"]
            if not isinstance(age, int) or age < 0:
                raise ValidationError(
                    "Age must be a positive integer",
                    error_code="USER_003",
                    details={"age": age}
                )
            
            # Process data (simulation)
            processed_data = {
                "id": hash(email) % 10000,
                "name": user_data["name"].title(),
                "email": email.lower(),
                "age": age,
                "status": "active"
            }
            
            logger.info(f"Successfully processed user: {processed_data['id']}")
            return processed_data
            
        except ValidationError as e:
            logger.error(f"Validation error: {e.message}", extra=e.details)
            raise
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            raise BaseApplicationError(
                "Failed to process user data",
                error_code="USER_999",
                details={"original_error": str(e)}
            )
    
    # Example usage with error handling
    test_cases = [
        {"name": "John Doe", "email": "john@example.com", "age": 30},  # Valid
        {"name": "Jane Doe", "email": "invalid-email", "age": 25},     # Invalid email
        {"email": "bob@example.com", "age": 35},                       # Missing name
        {"name": "Alice", "email": "alice@example.com", "age": -5},    # Invalid age
    ]
    
    for i, user_data in enumerate(test_cases):
        try:
            result = process_user_data(user_data)
            print(f"Test {i+1}: Success - {result}")
        except BaseApplicationError as e:
            print(f"Test {i+1}: Error - {e.message} (Code: {e.error_code})")
            if e.details:
                print(f"  Details: {e.details}")

if __name__ == "__main__":
    error_handling_examples()
```

### Retry and Circuit Breaker Patterns

```python
"""
Examples of retry and circuit breaker patterns for resilient applications.
"""

import time
import random
from python import Logger

def resilience_patterns_example():
    """Demonstrate retry and circuit breaker patterns."""
    
    logger = Logger("resilience")
    
    # Retry decorator
    def retry(max_attempts=3, delay=1, backoff=2):
        """Retry decorator with exponential backoff."""
        def decorator(func):
            def wrapper(*args, **kwargs):
                attempts = 0
                current_delay = delay
                
                while attempts < max_attempts:
                    try:
                        return func(*args, **kwargs)
                    except Exception as e:
                        attempts += 1
                        if attempts >= max_attempts:
                            logger.error(f"Max retry attempts reached for {func.__name__}")
                            raise
                        
                        logger.warning(f"Attempt {attempts} failed for {func.__name__}: {e}")
                        time.sleep(current_delay)
                        current_delay *= backoff
                
            return wrapper
        return decorator
    
    # Circuit breaker implementation
    class CircuitBreaker:
        def __init__(self, failure_threshold=5, recovery_timeout=60):
            self.failure_threshold = failure_threshold
            self.recovery_timeout = recovery_timeout
            self.failure_count = 0
            self.last_failure_time = None
            self.state = "CLOSED"  # CLOSED, OPEN, HALF_OPEN
        
        def call(self, func, *args, **kwargs):
            if self.state == "OPEN":
                if time.time() - self.last_failure_time > self.recovery_timeout:
                    self.state = "HALF_OPEN"
                    logger.info("Circuit breaker entering HALF_OPEN state")
                else:
                    raise Exception("Circuit breaker is OPEN")
            
            try:
                result = func(*args, **kwargs)
                if self.state == "HALF_OPEN":
                    self.state = "CLOSED"
                    self.failure_count = 0
                    logger.info("Circuit breaker reset to CLOSED state")
                return result
            except Exception as e:
                self.failure_count += 1
                self.last_failure_time = time.time()
                
                if self.failure_count >= self.failure_threshold:
                    self.state = "OPEN"
                    logger.error("Circuit breaker opened due to too many failures")
                
                raise
    
    # Example unreliable function
    @retry(max_attempts=3, delay=0.5)
    def unreliable_api_call(data):
        """Simulate an unreliable API call."""
        if random.random() < 0.7:  # 70% chance of failure
            raise Exception("API temporarily unavailable")
        return f"Success: {data}"
    
    # Circuit breaker usage
    circuit_breaker = CircuitBreaker(failure_threshold=3, recovery_timeout=5)
    
    def protected_api_call(data):
        return circuit_breaker.call(unreliable_api_call, data)
    
    # Test resilience patterns
    for i in range(10):
        try:
            result = protected_api_call(f"request_{i}")
            logger.info(f"Request {i}: {result}")
        except Exception as e:
            logger.error(f"Request {i} failed: {e}")
        
        time.sleep(0.1)  # Small delay between requests

if __name__ == "__main__":
    resilience_patterns_example()
```

## Performance Optimization

### Caching and Memoization

```python
"""
Performance optimization examples using caching and memoization.
"""

import time
import functools
from python import CacheManager, Logger

def performance_optimization_examples():
    """Demonstrate performance optimization techniques."""
    
    logger = Logger("performance")
    cache = CacheManager()
    
    # Memoization decorator
    def memoize(func):
        """Simple memoization decorator."""
        cache_dict = {}
        
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            # Create cache key from arguments
            key = str(args) + str(sorted(kwargs.items()))
            
            if key in cache_dict:
                logger.debug(f"Cache hit for {func.__name__}")
                return cache_dict[key]
            
            logger.debug(f"Cache miss for {func.__name__}")
            result = func(*args, **kwargs)
            cache_dict[key] = result
            return result
        
        return wrapper
    
    # Expensive computation example
    @memoize
    def fibonacci(n):
        """Calculate Fibonacci number (expensive without memoization)."""
        if n <= 1:
            return n
        return fibonacci(n - 1) + fibonacci(n - 2)
    
    # Batch processing example
    def process_data_batch(data_list, batch_size=100):
        """Process data in batches for better performance."""
        results = []
        
        for i in range(0, len(data_list), batch_size):
            batch = data_list[i:i + batch_size]
            
            # Process batch
            batch_results = []
            for item in batch:
                # Simulate processing
                processed_item = {"original": item, "processed": item * 2}
                batch_results.append(processed_item)
            
            results.extend(batch_results)
            logger.info(f"Processed batch {i//batch_size + 1}")
        
        return results
    
    # Performance measurement
    def measure_performance(func, *args, **kwargs):
        """Measure function execution time."""
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        
        execution_time = end_time - start_time
        logger.info(f"{func.__name__} executed in {execution_time:.4f} seconds")
        return result
    
    # Test performance optimizations
    logger.info("Testing Fibonacci with memoization:")
    measure_performance(fibonacci, 30)
    measure_performance(fibonacci, 30)  # Should be much faster (cached)
    
    logger.info("Testing batch processing:")
    large_dataset = list(range(1000))
    measure_performance(process_data_batch, large_dataset, batch_size=50)

if __name__ == "__main__":
    performance_optimization_examples()
```

### Asynchronous Processing

```python
"""
Examples of asynchronous processing for improved performance.
"""

import asyncio
import aiohttp
from python import Logger

async def async_processing_examples():
    """Demonstrate asynchronous processing patterns."""
    
    logger = Logger("async")
    
    # Async data fetching
    async def fetch_data(session, url):
        """Fetch data from URL asynchronously."""
        try:
            async with session.get(url) as response:
                data = await response.text()
                logger.info(f"Fetched data from {url}")
                return {"url": url, "status": response.status, "length": len(data)}
        except Exception as e:
            logger.error(f"Failed to fetch {url}: {e}")
            return {"url": url, "error": str(e)}
    
    # Concurrent data fetching
    async def fetch_multiple_urls(urls):
        """Fetch data from multiple URLs concurrently."""
        async with aiohttp.ClientSession() as session:
            tasks = [fetch_data(session, url) for url in urls]
            results = await asyncio.gather(*tasks, return_exceptions=True)
            return results
    
    # Async data processing
    async def process_data_async(data_item):
        """Process data item asynchronously."""
        # Simulate async processing
        await asyncio.sleep(0.1)
        return {
            "original": data_item,
            "processed": data_item * 2,
            "timestamp": asyncio.get_event_loop().time()
        }
    
    async def process_data_concurrently(data_list):
        """Process data list concurrently."""
        tasks = [process_data_async(item) for item in data_list]
        results = await asyncio.gather(*tasks)
        return results
    
    # Example usage
    logger.info("Starting async processing examples")
    
    # Test concurrent URL fetching
    test_urls = [
        "https://httpbin.org/delay/1",
        "https://httpbin.org/delay/2",
        "https://httpbin.org/status/200"
    ]
    
    try:
        fetch_results = await fetch_multiple_urls(test_urls)
        logger.info(f"Fetch results: {fetch_results}")
    except Exception as e:
        logger.error(f"Fetch failed: {e}")
    
    # Test concurrent data processing
    test_data = list(range(10))
    process_results = await process_data_concurrently(test_data)
    logger.info(f"Processing completed: {len(process_results)} items processed")

def run_async_examples():
    """Run async examples."""
    asyncio.run(async_processing_examples())

if __name__ == "__main__":
    run_async_examples()
```

## Best Practices

### Code Organization

```python
"""
Examples of code organization best practices.
"""

# Project structure example:
"""
project/
├── __init__.py
├── config/
│   ├── __init__.py
│   ├── settings.py
│   └── logging.py
├── models/
│   ├── __init__.py
│   ├── base.py
│   └── user.py
├── services/
│   ├── __init__.py
│   ├── user_service.py
│   └── data_service.py
├── utils/
│   ├── __init__.py
│   ├── validators.py
│   └── helpers.py
└── main.py
"""

# Example of well-organized module
from typing import Optional, Dict, Any
from python import Logger, ConfigManager, BaseModel

class UserService:
    """
    Service class for user-related operations.
    
    Demonstrates proper service layer organization with
    clear separation of concerns.
    """
    
    def __init__(self, config: ConfigManager, logger: Logger):
        self.config = config
        self.logger = logger
        self.cache_ttl = config.get("cache.user_ttl", 300)
    
    def create_user(self, user_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Create a new user with proper validation and error handling."""
        try:
            # Validate input
            self._validate_user_data(user_data)
            
            # Business logic
            processed_data = self._process_user_data(user_data)
            
            # Persistence (simulated)
            user_id = self._save_user(processed_data)
            
            self.logger.info(f"User created successfully: {user_id}")
            return {"id": user_id, **processed_data}
            
        except Exception as e:
            self.logger.error(f"Failed to create user: {e}")
            raise
    
    def _validate_user_data(self, user_data: Dict[str, Any]) -> None:
        """Private method for user data validation."""
        required_fields = ["name", "email"]
        for field in required_fields:
            if field not in user_data:
                raise ValueError(f"Missing required field: {field}")
    
    def _process_user_data(self, user_data: Dict[str, Any]) -> Dict[str, Any]:
        """Private method for user data processing."""
        return {
            "name": user_data["name"].strip().title(),
            "email": user_data["email"].strip().lower(),
            "is_active": True
        }
    
    def _save_user(self, user_data: Dict[str, Any]) -> int:
        """Private method for user persistence."""
        # Simulate database save
        return hash(user_data["email"]) % 10000

def code_organization_example():
    """Demonstrate code organization best practices."""
    
    # Dependency injection
    config = ConfigManager()
    logger = Logger("user_service")
    user_service = UserService(config, logger)
    
    # Usage
    user_data = {
        "name": "john doe",
        "email": "JOHN@EXAMPLE.COM"
    }
    
    try:
        user = user_service.create_user(user_data)
        print(f"Created user: {user}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    code_organization_example()
```

### Testing Patterns

```python
"""
Examples of testing best practices and patterns.
"""

import pytest
from unittest.mock import Mock, patch, MagicMock
from python import UserService, ConfigManager, Logger

class TestUserService:
    """
    Example test class demonstrating testing best practices.
    """
    
    def setup_method(self):
        """Set up test fixtures before each test."""
        self.mock_config = Mock(spec=ConfigManager)
        self.mock_logger = Mock(spec=Logger)
        self.user_service = UserService(self.mock_config, self.mock_logger)
    
    def test_create_user_success(self):
        """Test successful user creation."""
        # Arrange
        user_data = {"name": "john doe", "email": "john@example.com"}
        expected_result = {
            "id": 12345,
            "name": "John Doe",
            "email": "john@example.com",
            "is_active": True
        }
        
        # Mock dependencies
        self.mock_config.get.return_value = 300
        
        # Act
        with patch.object(self.user_service, '_save_user', return_value=12345):
            result = self.user_service.create_user(user_data)
        
        # Assert
        assert result == expected_result
        self.mock_logger.info.assert_called_once_with("User created successfully: 12345")
    
    def test_create_user_missing_field(self):
        """Test user creation with missing required field."""
        # Arrange
        user_data = {"name": "John Doe"}  # Missing email
        
        # Act & Assert
        with pytest.raises(ValueError, match="Missing required field: email"):
            self.user_service.create_user(user_data)
        
        self.mock_logger.error.assert_called_once()
    
    @patch('python.UserService._save_user')
    def test_create_user_database_error(self, mock_save):
        """Test user creation with database error."""
        # Arrange
        user_data = {"name": "John Doe", "email": "john@example.com"}
        mock_save.side_effect = Exception("Database connection failed")
        
        # Act & Assert
        with pytest.raises(Exception):
            self.user_service.create_user(user_data)
        
        self.mock_logger.error.assert_called_once()
    
    def test_data_processing(self):
        """Test user data processing logic."""
        # Arrange
        user_data = {"name": "  john doe  ", "email": "  JOHN@EXAMPLE.COM  "}
        expected_processed = {
            "name": "John Doe",
            "email": "john@example.com",
            "is_active": True
        }
        
        # Act
        result = self.user_service._process_user_data(user_data)
        
        # Assert
        assert result == expected_processed

# Integration test example
def test_integration_example():
    """Example of integration testing."""
    
    # Use real dependencies but with test configuration
    config = ConfigManager()
    config.config_data = {"cache": {"user_ttl": 100}}
    
    logger = Mock()  # Mock logger to avoid actual logging in tests
    
    user_service = UserService(config, logger)
    
    # Test with real service but mocked external dependencies
    user_data = {"name": "Integration Test", "email": "test@example.com"}
    
    with patch.object(user_service, '_save_user', return_value=99999):
        result = user_service.create_user(user_data)
    
    assert result["id"] == 99999
    assert result["name"] == "Integration Test"

if __name__ == "__main__":
    pytest.main([__file__])
```

## Common Patterns

### Singleton Pattern

```python
"""
Implementation of common design patterns.
"""

import threading

class Singleton:
    """
    Thread-safe singleton implementation.
    """
    _instances = {}
    _lock = threading.Lock()
    
    def __new__(cls, *args, **kwargs):
        if cls not in cls._instances:
            with cls._lock:
                if cls not in cls._instances:
                    cls._instances[cls] = super().__new__(cls)
        return cls._instances[cls]

class DatabaseConnection(Singleton):
    """Example singleton database connection."""
    
    def __init__(self):
        if not hasattr(self, 'initialized'):
            self.connection = None
            self.initialized = True
    
    def connect(self):
        if not self.connection:
            # Simulate database connection
            self.connection = "database_connection_object"
        return self.connection
```

### Observer Pattern

```python
"""
Observer pattern implementation example.
"""

from python import ObservableMixin

class UserModel(ObservableMixin):
    """User model with observer pattern."""
    
    def __init__(self, name: str, email: str):
        super().__init__()
        self._name = name
        self._email = email
    
    @property
    def name(self):
        return self._name
    
    @name.setter
    def name(self, value):
        old_value = self._name
        self._name = value
        self.notify_observers("name_changed", {"old": old_value, "new": value})
    
    @property
    def email(self):
        return self._email
    
    @email.setter
    def email(self, value):
        old_value = self._email
        self._email = value
        self.notify_observers("email_changed", {"old": old_value, "new": value})

def observer_pattern_example():
    """Demonstrate observer pattern usage."""
    
    # Create user model
    user = UserModel("John Doe", "john@example.com")
    
    # Add observers
    def name_observer(event, data):
        print(f"Name changed from {data['old']} to {data['new']}")
    
    def email_observer(event, data):
        print(f"Email changed from {data['old']} to {data['new']}")
    
    user.add_observer(name_observer)
    user.add_observer(email_observer)
    
    # Trigger changes
    user.name = "Jane Doe"
    user.email = "jane@example.com"

if __name__ == "__main__":
    observer_pattern_example()
```

## Troubleshooting

### Common Issues and Solutions

```python
"""
Common troubleshooting scenarios and solutions.
"""

from python import Logger, ConfigManager, ValidationError

def troubleshooting_examples():
    """Demonstrate common troubleshooting scenarios."""
    
    logger = Logger("troubleshooting")
    
    # Issue 1: Configuration not found
    def handle_missing_config():
        try:
            config = ConfigManager()
            config.load_from_file("nonexistent_config.json")
        except FileNotFoundError:
            logger.warning("Config file not found, using defaults")
            # Fallback to default configuration
            config.config_data = {
                "database": {"host": "localhost", "port": 5432},
                "cache": {"ttl": 300},
                "debug": False
            }
            return config
    
    # Issue 2: Validation errors
    def handle_validation_errors(user_data):
        try:
            # Attempt to validate
            if not user_data.get("email"):
                raise ValidationError("Email is required")
            
            if "@" not in user_data["email"]:
                raise ValidationError("Invalid email format")
            
            return True
            
        except ValidationError as e:
            logger.error(f"Validation failed: {e.message}")
            # Provide helpful error message to user
            return False
    
    # Issue 3: Performance problems
    def diagnose_performance_issues():
        import psutil
        import time
        
        # Monitor system resources
        cpu_percent = psutil.cpu_percent(interval=1)
        memory_info = psutil.virtual_memory()
        
        logger.info(f"CPU Usage: {cpu_percent}%")
        logger.info(f"Memory Usage: {memory_info.percent}%")
        
        if cpu_percent > 80:
            logger.warning("High CPU usage detected")
        
        if memory_info.percent > 80:
            logger.warning("High memory usage detected")
    
    # Issue 4: Database connection problems
    def handle_database_errors():
        max_retries = 3
        retry_delay = 1
        
        for attempt in range(max_retries):
            try:
                # Simulate database connection
                if attempt < 2:  # Fail first two attempts
                    raise ConnectionError("Database unavailable")
                
                logger.info("Database connection successful")
                return True
                
            except ConnectionError as e:
                logger.warning(f"Attempt {attempt + 1} failed: {e}")
                if attempt < max_retries - 1:
                    time.sleep(retry_delay)
                    retry_delay *= 2  # Exponential backoff
                else:
                    logger.error("Max retries reached, database unavailable")
                    return False
    
    # Run troubleshooting examples
    logger.info("Running troubleshooting examples:")
    
    # Test configuration handling
    config = handle_missing_config()
    
    # Test validation error handling
    test_data = {"name": "John", "email": "invalid-email"}
    is_valid = handle_validation_errors(test_data)
    logger.info(f"Validation result: {is_valid}")
    
    # Test performance monitoring
    diagnose_performance_issues()
    
    # Test database error handling
    db_connected = handle_database_errors()
    logger.info(f"Database connection: {db_connected}")

if __name__ == "__main__":
    troubleshooting_examples()
```

### Debug Utilities

```python
"""
Debugging utilities and helpers.
"""

import json
import traceback
from python import Logger

class DebugHelper:
    """Debug utilities for troubleshooting."""
    
    def __init__(self, logger: Logger):
        self.logger = logger
    
    def debug_object(self, obj, name="object"):
        """Debug object by printing its attributes and methods."""
        self.logger.debug(f"Debugging {name}:")
        self.logger.debug(f"Type: {type(obj)}")
        self.logger.debug(f"Dir: {dir(obj)}")
        
        if hasattr(obj, '__dict__'):
            self.logger.debug(f"Attributes: {obj.__dict__}")
    
    def debug_function_call(self, func, *args, **kwargs):
        """Debug function call with arguments and result."""
        self.logger.debug(f"Calling {func.__name__}")
        self.logger.debug(f"Args: {args}")
        self.logger.debug(f"Kwargs: {kwargs}")
        
        try:
            result = func(*args, **kwargs)
            self.logger.debug(f"Result: {result}")
            return result
        except Exception as e:
            self.logger.error(f"Exception in {func.__name__}: {e}")
            self.logger.error(f"Traceback: {traceback.format_exc()}")
            raise
    
    def debug_data_flow(self, data, stage_name):
        """Debug data at different stages of processing."""
        self.logger.debug(f"Data at stage '{stage_name}':")
        
        if isinstance(data, (dict, list)):
            self.logger.debug(json.dumps(data, indent=2, default=str))
        else:
            self.logger.debug(f"Value: {data}")
            self.logger.debug(f"Type: {type(data)}")

def debug_utilities_example():
    """Demonstrate debug utilities usage."""
    
    logger = Logger("debug")
    debug_helper = DebugHelper(logger)
    
    # Debug object
    class SampleClass:
        def __init__(self):
            self.attribute1 = "value1"
            self.attribute2 = 42
    
    sample_obj = SampleClass()
    debug_helper.debug_object(sample_obj, "SampleClass instance")
    
    # Debug function call
    def sample_function(x, y, multiplier=1):
        return (x + y) * multiplier
    
    result = debug_helper.debug_function_call(sample_function, 5, 10, multiplier=2)
    
    # Debug data flow
    initial_data = {"users": [{"name": "John", "age": 30}]}
    debug_helper.debug_data_flow(initial_data, "initial")
    
    processed_data = {
        "users": [{"name": "John", "age": 30, "category": "adult"}]
    }
    debug_helper.debug_data_flow(processed_data, "after_processing")

if __name__ == "__main__":
    debug_utilities_example()
```

---

## Summary

This comprehensive examples documentation provides:

1. **Quick Start Examples**: Basic usage patterns to get started quickly
2. **Advanced Scenarios**: Complex real-world usage patterns
3. **Integration Examples**: How to integrate with external systems
4. **Error Handling**: Comprehensive error handling patterns
5. **Performance Optimization**: Techniques for improving performance
6. **Best Practices**: Code organization and testing patterns
7. **Common Patterns**: Implementation of design patterns
8. **Troubleshooting**: Solutions for common issues

Each example includes:
- Complete, runnable code
- Detailed comments explaining the concepts
- Error handling and logging
- Best practices implementation
- Real-world scenarios

This documentation will be updated as new features are implemented, ensuring that all examples remain current and useful for developers using the project.

**Version**: 1.0.0
**Last Updated**: $(date)