export function formatToLocalDate(
  isoDateString: string,
  locales: string | string[] = undefined,
  options?: Intl.DateTimeFormatOptions
): string {
  try {
    // Parse the ISO string into a Date object
    const date = new Date(isoDateString)

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error('Invalid Date')
    }

    // Default options for time and date
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }

    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }

    // Create separate formatters for time and date
    const timeFormatter = new Intl.DateTimeFormat(locales, options ?? timeOptions)
    const dateFormatter = new Intl.DateTimeFormat(locales, options ?? dateOptions)

    // Format time first, then date
    const timeString = timeFormatter.format(date)
    const dateString = dateFormatter.format(date)

    // Return the formatted time followed by date
    return `${timeString}, ${dateString}`
  } catch (error) {
    console.error('Error formatting date:', error)
    return 'Invalid Date'
  }
}
