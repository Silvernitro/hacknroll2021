import styles from "./ItemList.module.css";

export default function ItemList({ donations, claims }) {
  const items = []
  donations.forEach(donation => {
    items.push({ type: "donation", ...donation});
  })

  claims.forEach(claim => {
    items.push({ type: "claim", ...claim});
  })

  items.sort((a, b) => {
    return a.date < b.date
      ? -1
      : a.date > b.date
        ? 1
        : 0
  })

  console.log(items);

  return (
    <ul className={styles.listItem}>
      {/* {donations.map(donation => {
        const date = new Date(parseInt(donation.date));
        return <li key={donation.date}>{`Received $${donation.amount} on ${date.toDateString()}`}</li>
      })}

      {claims.map(claim => {
        const date = new Date(parseInt(claim.date));
        return <li key={claim.date}>
          {`Claimed ${claim.item.name} ($${claim.item.price}) on ${date.toDateString()}`}
          </li>
      })} */}

      {items.map(item => {
        const date = new Date(parseInt(item.date));

        if (item.type === "donation") {
          return <li key={item.date}>{`Received $${item.amount} on ${date.toDateString()}`}</li>
        } else {
          return <li key={item.date}>
            {`Claimed ${item.item.name} ($${item.item.price}) on ${date.toDateString()}`}
            </li>
        }

      })}
    </ul>
  )

}
