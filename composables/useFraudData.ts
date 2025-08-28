export const useFraudData = () => {
  const generateMockTransactions = (count: number) => {
    const transactions = []
    for (let i = 0; i < count; i++) {
      transactions.push({
        id: `TXN${String(i + 1).padStart(6, '0')}`,
        amount: Math.random() * 5000 + 10,
        timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        merchant: ['Amazon', 'Walmart', 'Gas Station', 'Restaurant', 'ATM'][Math.floor(Math.random() * 5)],
        location: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'][Math.floor(Math.random() * 5)],
        cardType: ['Visa', 'MasterCard', 'American Express'][Math.floor(Math.random() * 3)],
        isFraud: Math.random() < 0.05,
        confidence: Math.random() * 100,
        riskScore: Math.random() * 100
      })
    }
    return transactions
  }

  const modelMetrics = ref({
    accuracy: 98.7,
    precision: 94.2,
    recall: 89.5,
    f1Score: 91.8,
    lastUpdated: new Date(),
    status: 'active',
    totalTransactions: 1250000,
    fraudDetected: 15750,
    falsePositives: 420
  })

  const dailyStats = ref([
    { date: '2024-01-15', transactions: 45000, frauds: 180, blocked: 165 },
    { date: '2024-01-16', transactions: 48000, frauds: 195, blocked: 178 },
    { date: '2024-01-17', transactions: 52000, frauds: 210, blocked: 198 },
    { date: '2024-01-18', transactions: 49000, frauds: 175, blocked: 160 },
    { date: '2024-01-19', transactions: 51000, frauds: 220, blocked: 205 },
    { date: '2024-01-20', transactions: 47000, frauds: 165, blocked: 152 },
    { date: '2024-01-21', transactions: 53000, frauds: 240, blocked: 225 }
  ])

  return {
    generateMockTransactions,
    modelMetrics,
    dailyStats
  }
}