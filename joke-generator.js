// Random Joke Generator using JokeAPI
// This fetches random jokes from an external API

const fetchJoke = async () => {
  try {
    // Fetch a random joke from JokeAPI
    const response = await fetch('https://v2.jokeapi.dev/joke/Any');
    
    if (!response.ok) {
      throw new Error('Failed to fetch joke');
    }
    
    const data = await response.json();
    
    // JokeAPI returns either a single joke or a two-part joke
    if (data.type === 'single') {
      console.log('Joke:', data.joke);
      return data.joke;
    } else if (data.type === 'twopart') {
      console.log('Setup:', data.setup);
      console.log('Delivery:', data.delivery);
      return `${data.setup}\n${data.delivery}`;
    }
  } catch (error) {
    console.error('Error fetching joke:', error);
    return 'Sorry, could not fetch a joke at this time.';
  }
};

// Function to get a joke from a specific category
const fetchJokeByCategory = async (category = 'Any') => {
  try {
    const response = await fetch(`https://v2.jokeapi.dev/joke/${category}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch joke from category: ${category}`);
    }
    
    const data = await response.json();
    
    if (data.type === 'single') {
      return data.joke;
    } else if (data.type === 'twopart') {
      return `${data.setup}\n${data.delivery}`;
    }
  } catch (error) {
    console.error('Error fetching joke:', error);
    return 'Sorry, could not fetch a joke at this time.';
  }
};

// Categories available: General, Programming, Knock-knock, Spooky, Christmas, Any
// Example usage:
(async () => {
  console.log('\n=== Random Joke ===');
  await fetchJoke();
  
  console.log('\n=== Programming Joke ===');
  await fetchJokeByCategory('Programming');
  
  console.log('\n=== Knock-knock Joke ===');
  await fetchJokeByCategory('Knock-knock');
})();
