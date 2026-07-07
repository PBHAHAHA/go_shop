/**
 * [INPUT]: 依赖 models/ipCreation 的 IpCharacterBrief
 * [OUTPUT]: 对外提供 buildTurnaroundBoardPrompt
 * [POS]: Mastra Prompt 边界，把结构化 IP Brief 转为类型自适应三视图设定板图片生成提示词
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import type { IpCharacterBrief } from "../../models/ipCreation";

function getConsistencyRules(brief: IpCharacterBrief) {
  switch (brief.ipType) {
    case "animal":
      return "同一动物 IP 的头身比例、毛色/皮肤纹理、耳朵、尾巴、爪子、眼睛、标志性斑纹完全一致。";
    case "fantasy":
      return "同一幻想 IP 的物种特征、轮廓比例、皮肤/鳞片/羽毛/能量纹理、头部结构、肢体数量和装饰完全一致。";
    case "mascot":
      return "同一品牌吉祥物的主体轮廓、表情体系、材质、品牌识别特征、配色和比例完全一致。";
    case "objectMascot":
      return "同一物品拟人 IP 的主体物件形态、拟人部件、材质、标志性轮廓、表情和配色完全一致。";
    case "hybrid":
      return "同一混合形态 IP 的人/动物/物件融合比例、轮廓、材质、表情、服装或装饰完全一致。";
    case "human":
    case "unknown":
    default:
      return "同一角色的五官、发型、服装、体型、身高比例、材质和整体气质完全一致。";
  }
}

function briefLines(brief: IpCharacterBrief) {
  return [
    `IP 类型: ${brief.ipType}`,
    brief.coreIdentity ? `核心身份: ${brief.coreIdentity}` : "",
    brief.visualStyle ? `视觉风格: ${brief.visualStyle}` : "",
    brief.styleKeywords.length > 0
      ? `风格关键词: ${brief.styleKeywords.join("、")}`
      : "",
    brief.bodyShapeOrSilhouette
      ? `身体/轮廓: ${brief.bodyShapeOrSilhouette}`
      : "",
    brief.faceOrHeadFeatures ? `脸部/头部: ${brief.faceOrHeadFeatures}` : "",
    brief.hairOrSurfaceFeatures
      ? `毛发/表面特征: ${brief.hairOrSurfaceFeatures}`
      : "",
    brief.outfitOrMaterial ? `服装/材质: ${brief.outfitOrMaterial}` : "",
    brief.surfaceOrMaterialDetails
      ? `材质细节: ${brief.surfaceOrMaterialDetails}`
      : "",
    brief.colorPalette ? `主色 palette: ${brief.colorPalette}` : "",
    brief.personality ? `性格气质: ${brief.personality}` : "",
    brief.useCase ? `运营用途: ${brief.useCase}` : "",
    brief.mustKeep.length > 0 ? `必须保留: ${brief.mustKeep.join("、")}` : "",
    brief.mustAvoid.length > 0 ? `必须避免: ${brief.mustAvoid.join("、")}` : "",
  ].filter(Boolean);
}

export function buildTurnaroundBoardPrompt(brief: IpCharacterBrief) {
  return [
    "生成一张高精度、干净极简的原创 IP 形象三视图设定板，横版构图，纯白背景，专业角色建模参考页，类似 game character turnaround board / fashion character design sheet / mascot design reference sheet。",
    "",
    "IP 设定:",
    briefLines(brief).join("\n"),
    "",
    "画面左侧为同一 IP 形象的全身/完整主体三视图，占据主要视觉区域，分别展示:",
    "1. 正面完整站姿或完整主体正视图",
    "2. 左侧面完整站姿或完整主体侧视图",
    "3. 背面完整站姿或完整主体背视图",
    "",
    `三张主视图必须是同一个 IP。${getConsistencyRules(brief)} 平视镜头，中性棚拍光，姿态自然，无遮挡，无夸张透视，无复杂背景，适合角色建模参考。`,
    "",
    "画面右上区域放置六张同一 IP 的头部/主体关键角度参考图，排列整齐，包括:",
    "1. 正面头像或主体正面近景",
    "2. 俯视头顶/顶部结构角度",
    "3. 后脑勺/后方头部或主体背面近景",
    "4. 左侧轮廓",
    "5. 近距离正侧面对照角度",
    "6. 3/4 侧脸或 3/4 主体近景",
    "要求结构走向清晰，五官/表情/头部/主体轮廓统一，适合作为 IP 头部和主体结构设定参考。",
    "",
    "画面右下区域放置六张局部细节图，排列成整齐小方格，展示 IP 关键细节，包括:",
    "1. 上身/主体材质质感特写",
    "2. 下身/主体正面局部特写",
    "3. 背部或尾部/臀部/后侧剪裁特写",
    "4. 腿部/爪子/皮肤/表面纹理局部细节",
    "5. 眼部/五官/表情局部特写",
    "6. 鞋子/脚部/底座/关键单品完整特写",
    "",
    "所有细节图都要与主 IP 完全一致，材质真实，细节干净，适合作为角色建模、潮玩打样或品牌吉祥物制作参考。",
    "",
    "整体风格要求: 极简、专业、写实高级质感、统一光线、统一角色一致性、干净、高级、留白充足、排版整齐清晰、信息分区明确、人物/主体边缘清晰、服装或材质版型明确、发丝/毛发/表面纹理自然、材质表现准确，像专业美术团队制作的 IP 形象设定页。",
    "",
    "输出要求: 横版构图，白底，完整主体，不裁切，不出现多余道具，不出现文字说明，不出现 LOGO，不出现水印，不出现 UI 界面元素，不出现点赞收藏按钮，不出现社交媒体截图感。",
  ].join("\n");
}
