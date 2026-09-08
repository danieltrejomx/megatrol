export interface BankDetails {
  beneficiary: string;
  bankName: string;
  bankCode: string;
  clabe: string;
  supportPhone: string;
  supportWhatsapp: string;
  supportEmail: string;
}

export const MEGATROL_BANK_DETAILS: BankDetails = {
  beneficiary: 'Distribuidora de Megatrol',
  bankName: 'Banamex (Citibanamex)',
  bankCode: '002',
  clabe: '002180701855593251',
  supportPhone: '(55) 3620 6854',
  supportWhatsapp: '525536206854',
  supportEmail: 'ventas@megatrol.com.mx'
};
