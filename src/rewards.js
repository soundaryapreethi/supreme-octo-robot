export function calculateRewardPoints(amount) {
    let points = 0;
    if (amount > 100) {
      points += (amount - 100) * 2 + 50; // over $100
    } else if (amount > 50) {
      points += (amount - 50); // between $50-$100
    }
    return points;
  }