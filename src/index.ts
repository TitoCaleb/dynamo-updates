import { getAllCustomersWithClientId } from "./repository/CustomerRepository";
import {
  getPortfolio,
  updatePortfolio,
} from "./repository/PortfolioRepository";

const processAllCustomersWithPortfolio = async () => {
  let lastEvaluatedKey: Record<string, any> | undefined = undefined;
  let totalProcessed = 0;
  let totalNotProcessed = 0;
  let batchNumber = 1;

  console.log("Starting to process all customers...");

  do {
    console.log(`\n--- Processing batch ${batchNumber} ---`);

    const { items: customers, lastEvaluatedKey: nextKey } =
      await getAllCustomersWithClientId({
        limit: 390,
        lastEvaluatedKey: lastEvaluatedKey,
        clientId: "5seu5ehrje7bgs79rcn6gau2p4",
      });

    if (customers.length === 0) {
      console.log("No more customers to process");
      break;
    }

    console.log(`Processing ${customers.length} customers in this batch`);

    for (const customer of customers) {
      try {
        const portfolio = await getPortfolio(customer.customerId);

        if (portfolio) {
          await updatePortfolio({
            portfolioId: portfolio.id,
            customerId: customer.customerId,
            clientId: customer.clientId,
          });
          console.log(
            `Customer ${customer.customerId} has clientId ${customer.clientId} and updated portfolio ${portfolio.id}`
          );
          totalProcessed++;
        } else {
          totalNotProcessed++;
        }

        totalProcessed++;
      } catch (error) {
        console.error(`Error processing customer ${customer.customerId}`);
      }
    }

    console.log(
      `Batch ${batchNumber} completed. Total processed so far: ${totalProcessed}`
    );

    lastEvaluatedKey = nextKey;
    batchNumber++;
  } while (lastEvaluatedKey);

  console.log(`\n=== Processing completed ===`);
  console.log(`Total customers processed: ${totalProcessed}`);
  console.log(`Total batches processed: ${batchNumber - 1}`);
  console.log(`Total customers not processed: ${totalNotProcessed}`);
};

processAllCustomersWithPortfolio();
