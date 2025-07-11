export class Validation {
  // Email validation
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Password validation
  static isValidPassword(password: string): boolean {
    // At least 6 characters
    return password.length >= 6;
  }

  // Strong password validation
  static isStrongPassword(password: string): boolean {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  }

  // Phone number validation (Indonesian format)
  static isValidPhoneNumber(phone: string): boolean {
    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
    return phoneRegex.test(phone);
  }

  // Tournament name validation
  static isValidTournamentName(name: string): boolean {
    return name.trim().length >= 3 && name.trim().length <= 100;
  }

  // Tournament description validation
  static isValidTournamentDescription(description: string): boolean {
    return description.trim().length >= 10 && description.trim().length <= 1000;
  }

  // Team name validation
  static isValidTeamName(name: string): boolean {
    return name.trim().length >= 2 && name.trim().length <= 50;
  }

  // Player name validation
  static isValidPlayerName(name: string): boolean {
    return name.trim().length >= 2 && name.trim().length <= 50;
  }

  // Prize pool validation
  static isValidPrizePool(amount: number): boolean {
    return amount >= 0 && amount <= 1000000000; // Max 1 billion
  }

  // Date validation
  static isValidDate(date: Date): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  // Future date validation
  static isFutureDate(date: Date): boolean {
    return date > new Date();
  }

  // Date range validation
  static isValidDateRange(startDate: Date, endDate: Date): boolean {
    return startDate < endDate;
  }

  // File size validation (in bytes)
  static isValidFileSize(size: number, maxSizeMB: number = 10): boolean {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return size <= maxSizeBytes;
  }

  // File type validation
  static isValidImageType(mimeType: string): boolean {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    return allowedTypes.includes(mimeType);
  }

  // URL validation
  static isValidURL(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  // Social media handle validation
  static isValidSocialMediaHandle(handle: string): boolean {
    // Remove @ if present
    const cleanHandle = handle.startsWith('@') ? handle.slice(1) : handle;
    const handleRegex = /^[a-zA-Z0-9._]{3,30}$/;
    return handleRegex.test(cleanHandle);
  }

  // Game ID validation (for games like Mobile Legends, PUBG, etc.)
  static isValidGameID(gameId: string): boolean {
    const gameIdRegex = /^[0-9]{4,20}$/;
    return gameIdRegex.test(gameId);
  }

  // Tournament code validation
  static isValidTournamentCode(code: string): boolean {
    const codeRegex = /^[A-Z0-9]{6,12}$/;
    return codeRegex.test(code);
  }

  // Score validation
  static isValidScore(score: number): boolean {
    return Number.isInteger(score) && score >= 0;
  }

  // Match duration validation (in minutes)
  static isValidMatchDuration(duration: number): boolean {
    return Number.isInteger(duration) && duration >= 1 && duration <= 480; // Max 8 hours
  }

  // Team size validation
  static isValidTeamSize(size: number, gameType: string): boolean {
    const gameTeamSizes: { [key: string]: { min: number; max: number } } = {
      'Mobile Legends': { min: 5, max: 5 },
      'Valorant': { min: 5, max: 5 },
      'PUBG Mobile': { min: 4, max: 4 },
      'Free Fire': { min: 4, max: 4 },
      'eFootball': { min: 1, max: 1 },
      'Dota 2': { min: 5, max: 5 },
      'League of Legends': { min: 5, max: 5 },
      'CS:GO': { min: 5, max: 5 },
      'FIFA': { min: 1, max: 1 },
    };

    const limits = gameTeamSizes[gameType] || { min: 1, max: 10 };
    return size >= limits.min && size <= limits.max;
  }

  // Tournament participant limit validation
  static isValidParticipantLimit(limit: number, format: string): boolean {
    const minParticipants = 2;
    let maxParticipants = 1000;

    switch (format) {
      case 'Single Elimination':
      case 'Double Elimination':
        // Must be power of 2 for elimination tournaments
        return limit >= minParticipants && limit <= maxParticipants && (limit & (limit - 1)) === 0;
      case 'Round Robin':
        // Any number for round robin
        return limit >= minParticipants && limit <= 50; // Max 50 for round robin
      default:
        return limit >= minParticipants && limit <= maxParticipants;
    }
  }

  // Generate error messages
  static getErrorMessage(field: string, value: any, type: string): string {
    switch (type) {
      case 'required':
        return `${field} is required`;
      case 'email':
        return 'Please enter a valid email address';
      case 'password':
        return 'Password must be at least 6 characters long';
      case 'strongPassword':
        return 'Password must be at least 8 characters with uppercase, lowercase, and number';
      case 'phone':
        return 'Please enter a valid phone number';
      case 'tournamentName':
        return 'Tournament name must be between 3 and 100 characters';
      case 'teamName':
        return 'Team name must be between 2 and 50 characters';
      case 'playerName':
        return 'Player name must be between 2 and 50 characters';
      case 'prizePool':
        return 'Prize pool must be a positive number';
      case 'futureDate':
        return 'Date must be in the future';
      case 'dateRange':
        return 'End date must be after start date';
      case 'fileSize':
        return 'File size must be less than 10MB';
      case 'fileType':
        return 'Please select a valid image file';
      case 'url':
        return 'Please enter a valid URL';
      case 'socialMedia':
        return 'Please enter a valid social media handle';
      case 'gameID':
        return 'Please enter a valid game ID';
      case 'tournamentCode':
        return 'Tournament code must be 6-12 characters (letters and numbers only)';
      case 'score':
        return 'Score must be a non-negative integer';
      case 'teamSize':
        return 'Invalid team size for this game';
      case 'participantLimit':
        return 'Invalid participant limit for this tournament format';
      default:
        return `Invalid ${field}`;
    }
  }

  // Validate form data
  static validateFormData(data: any, rules: { [key: string]: string[] }): { [key: string]: string } {
    const errors: { [key: string]: string } = {};

    for (const [field, fieldRules] of Object.entries(rules)) {
      const value = data[field];

      for (const rule of fieldRules) {
        if (rule === 'required' && (!value || (typeof value === 'string' && !value.trim()))) {
          errors[field] = this.getErrorMessage(field, value, 'required');
          break;
        }

        if (value && rule === 'email' && !this.isValidEmail(value)) {
          errors[field] = this.getErrorMessage(field, value, 'email');
          break;
        }

        if (value && rule === 'password' && !this.isValidPassword(value)) {
          errors[field] = this.getErrorMessage(field, value, 'password');
          break;
        }

        if (value && rule === 'strongPassword' && !this.isStrongPassword(value)) {
          errors[field] = this.getErrorMessage(field, value, 'strongPassword');
          break;
        }

        if (value && rule === 'phone' && !this.isValidPhoneNumber(value)) {
          errors[field] = this.getErrorMessage(field, value, 'phone');
          break;
        }

        if (value && rule === 'tournamentName' && !this.isValidTournamentName(value)) {
          errors[field] = this.getErrorMessage(field, value, 'tournamentName');
          break;
        }

        if (value && rule === 'teamName' && !this.isValidTeamName(value)) {
          errors[field] = this.getErrorMessage(field, value, 'teamName');
          break;
        }

        if (value && rule === 'playerName' && !this.isValidPlayerName(value)) {
          errors[field] = this.getErrorMessage(field, value, 'playerName');
          break;
        }

        if (value && rule === 'prizePool' && !this.isValidPrizePool(value)) {
          errors[field] = this.getErrorMessage(field, value, 'prizePool');
          break;
        }

        if (value && rule === 'futureDate' && !this.isFutureDate(value)) {
          errors[field] = this.getErrorMessage(field, value, 'futureDate');
          break;
        }

        if (value && rule === 'url' && !this.isValidURL(value)) {
          errors[field] = this.getErrorMessage(field, value, 'url');
          break;
        }

        if (value && rule === 'socialMedia' && !this.isValidSocialMediaHandle(value)) {
          errors[field] = this.getErrorMessage(field, value, 'socialMedia');
          break;
        }

        if (value && rule === 'gameID' && !this.isValidGameID(value)) {
          errors[field] = this.getErrorMessage(field, value, 'gameID');
          break;
        }

        if (value && rule === 'tournamentCode' && !this.isValidTournamentCode(value)) {
          errors[field] = this.getErrorMessage(field, value, 'tournamentCode');
          break;
        }

        if (value && rule === 'score' && !this.isValidScore(value)) {
          errors[field] = this.getErrorMessage(field, value, 'score');
          break;
        }
      }
    }

    return errors;
  }
}