const API_BASE_URL = 'https://climatefast.webcomand.com/ws/get'
const API_KEY = '6njQdl3IpkiuMODvQoXdPoV9RQ3vkUXM'

export async function fetchVotingItems() {
  try {
    const response = await fetch(`${API_BASE_URL}?query=SELECT * FROM Motion`, {
      headers: {
        'Authorization': `Token ${API_KEY}`,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    // Log the contents key to verify that it holds the voting items
    console.log('Full API response:', data)
    console.log('Contents:', data.contents)

    // Check if contents exist and is an array, return it if so
    if (data.contents && Array.isArray(data.contents)) {
      return data.contents
    } else {
      throw new Error('Unexpected data structure in contents')
    }
  } catch (error) {
    console.error('Error fetching voting items:', error)
    throw error
  }
}
