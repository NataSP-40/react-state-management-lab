import { useState } from 'react'
import './App.css'

const zombieFighters = [
  {
    id: 1,
    name: 'Survivor',
    price: 12,
    strength: 6,
    agility: 4,
    img: 'https://i.ibb.co/CKXhpNN3/Survivor.png',
  },
  {
    id: 2,
    name: 'Scavenger',
    price: 10,
    strength: 5,
    agility: 5,
    img: 'https://i.ibb.co/LdTRTSm4/Scavanger.png',
  },
  {
    id: 3,
    name: 'Shadow',
    price: 18,
    strength: 7,
    agility: 8,
    img: 'https://i.ibb.co/cMp9M8Z/Shadow2.png',
  },
  {
    id: 4,
    name: 'Tracker',
    price: 14,
    strength: 7,
    agility: 6,
    img: 'https://i.ibb.co/NnKTk2xz/Tracker.png',
  },
  {
    id: 5,
    name: 'Sharpshooter',
    price: 20,
    strength: 6,
    agility: 8,
    img: 'https://i.ibb.co/84R5w4yM/Sharshooter.png',
  },
  {
    id: 6,
    name: 'Medic',
    price: 15,
    strength: 5,
    agility: 7,
    img: 'https://i.ibb.co/tP4J4P3C/Medic.png',
  },
  {
    id: 7,
    name: 'Engineer',
    price: 16,
    strength: 6,
    agility: 5,
    img: 'https://i.ibb.co/MyMxj58n/engineer.png',
  },
  {
    id: 8,
    name: 'Brawler',
    price: 11,
    strength: 8,
    agility: 3,
    img: 'https://i.ibb.co/Hp1RLR7S/Brawler.png',
  },
  {
    id: 9,
    name: 'Infiltrator',
    price: 17,
    strength: 5,
    agility: 9,
    img: 'https://i.ibb.co/HLYVyZd0/Infiltrator.png',
  },
  {
    id: 10,
    name: 'Leader',
    price: 22,
    strength: 7,
    agility: 6,
    img: 'https://i.ibb.co/wNrdKkmK/Leader.png',
  },
]



const App = () => {
  // state setup
  const [money, setMoney] = useState(100);
  const [team, setTeam] = useState([]);
  const [available, setAvailable] = useState(zombieFighters);

  //-----ADD FIGHTER-----
  const handleAddFighter = (fighter) => {
    // will pass fighter when button clicked
    // console.log(`${fighter.name} is added to the team!`)

    if (money < fighter.price) {
      alert(`Not enough money to get ${fighter.name}!`)
      return;
    };

    const isAvailable = available.some((f) => f.id === fighter.id);
    if(!isAvailable) {
      alert(`${fighter.name} is no longer available!`);
      return;
    }

    setTeam([...team, fighter]); // update the state
    setMoney((prevMoney) => prevMoney - fighter.price);
    setAvailable((prevAvailable) => prevAvailable.filter((f) => f.id !== fighter.id));
  }

  //-----REMOVE FIGHTER from my team-------
  const handleRemoveFighter = (fighterId) => {
    //find the fighter object in the team by id 
    const fighterToRemove = team.find((member) => member.id === fighterId);
    if (!fighterToRemove) return; // if not found do nothing

    setTeam((prevTeam) => prevTeam.filter((member) => member.id !== fighterId)); // remove fighter from Team
    setMoney((prevMoney) => prevMoney + fighterToRemove.price); // refund money
    setAvailable((prevAvailable) => {
      const newAvailable = [...prevAvailable, fighterToRemove];
      return newAvailable.sort((a, b) => a.id - b.id);
    });
  };

   /* ---------- Derived totals for the team ---------- */
  // total cost, strength, agility — computed from `team`
  // using reduce() to iterate over team array and accumulate values
  // initial value of sum is 0
  // for each fighter f in team, add f.price to sum
  // return the final sum after processing all fighters
  // same logic applies for strength and agility
  // these totals will update automatically when team changes
  const totalCost = team.reduce((sum, f) => sum + f.price, 0);
  const totalStrength = team.reduce((sum, f) => sum + f.strength, 0);
  const totalAgility = team.reduce((sum, f) => sum + f.agility, 0);

// -------UI---------
  return (
    <div>
      <h1>Reactville Zombie Defence</h1>
      {/* <p>Money left: ${money}</p>
      <p>Team size: {team.length}</p> */}
      

      {/* Show current money and team size */}
      <div>
        <strong>Money:</strong> ${money};
        <strong>Team Size:</strong> {team.length}
      </div>

      {/* Team Stats */}
      <div style={{ marginTop: 8}}>
        <strong>Team totals:</strong>
        <div>Cost: ${totalCost} | Strength: {totalStrength} | Agility: {totalAgility}</div>
      </div>

      {/* Available fighter list */}
      <section style={{ marginTop: 20}}>
        <h2>Available Fighters</h2>
        <ul>
          {available.map((fighter) => ( // looping through zombieFighters and for each show stats
            <li key={fighter.id}>
              <img src={fighter.img} alt={fighter.name} style={{ width: "80px" }} 
              />
              <h3>{fighter.name}</h3>
              <p>Price: {fighter.price}</p>
              <p>Strength: {fighter.strength}</p>
              <p>Agility: {fighter.agility}</p>

              <button onClick={() => handleAddFighter(fighter)}>Add to Team</button>
            </li>
          ))}
        </ul>
      </section>
      
      {/* current Team */}
      <h2>Your Team</h2>
      {team.length === 0 ? (
        <p>No team members yet - hire some fighters!</p>
      ) : (
        <ul>
          {team.map((member) => (
            <li key={member.id} 
            // style={{ marginBottom: 12, listStyle: 'none' }}
            >
            <img src={member.img} alt={member.name} style={{ width: 80 }} />
            <h3>{member.name}</h3>
            {/* <strong style={{ marginLeft: 8 }}>{member.name}</strong> */}
            <span style={{ marginLeft: 12 }}>{member.price}</span>
            <span style={{ marginLegt: 8 }}>{member.strength}</span>
            <span style={{ marginLeft: 8 }}>{member.agility}</span>
            <button style={{ marginLeft: 12 }} onClick={() => handleRemoveFighter(member.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App
