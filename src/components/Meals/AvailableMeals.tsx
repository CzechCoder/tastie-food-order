import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

// hardcoded data
const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Mozarella and tomatoes",
    description: "Finest vegetable combination",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Ceasar sallad with chicken and bacon",
    description: "Italian specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Baked duck with cabbage and potatoes",
    description: "Energetic and good!",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Beef with garlic and spinach",
    description: "The finest ingredients only!",
    price: 18.99,
  },
];

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
