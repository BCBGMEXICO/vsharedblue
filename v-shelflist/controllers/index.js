const availableProducts = (product, cb) => {
  let SkusAvailable = []

  SkusAvailable = product.items.filter((item) => (item.sellers[0].commertialOffer.AvailableQuantity > 0))

  const bestSkus = SkusAvailable.sort((a, b) => a.sellers.sort((c, d) => c.commertialOffer.Price - d.commertialOffer.Price)[0].commertialOffer.Price - b.sellers.sort((c, d) => c.commertialOffer.Price - d.commertialOffer.Price)[0].commertialOffer.Price)

  cb(bestSkus)
}
const getBestInstallment = (installments) => (
  installments
    .sort((a, b) => a.NumberOfInstallments - b.NumberOfInstallments)
    .sort((a, b) => a.InterestRate - b.InterestRate)
    .sort((a, b) => a.Value - b.Value)[0]
)

export default Controller = {
  availableProducts,
  getBestInstallment,
}
