
export interface Family {
  familyCode: string;
  area: string;
  guide: string;
  name: string;
  nationalId: string;
  phone: string;
  familySize: number;
  aidType: string;
  committee: string;
}

export const aidTypes = ['غسالة', 'ثلاجة', 'وجبات', 'ملابس', 'أجهزة كهربائية', 'أثاث', 'مواد غذائية'];
export const committees = ['عيني', 'إطعام', 'كسوة', 'أثاث'];
